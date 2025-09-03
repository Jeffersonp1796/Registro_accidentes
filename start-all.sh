#!/bin/bash

# Script maestro para ejecutar backend y frontend
# Uso: ./start-all.sh

echo "🚀 Iniciando Sistema de Registro de Accidentes"
echo "=============================================="

# Función para mostrar ayuda
show_help() {
    echo ""
    echo "📋 Comandos disponibles:"
    echo "  ./start-all.sh backend     - Solo backend"
    echo "  ./start-all.sh frontend    - Solo frontend"
    echo "  ./start-all.sh all         - Backend y frontend"
    echo "  ./start-all.sh stop        - Detener todos los servicios"
    echo "  ./start-all.sh status      - Estado de los servicios"
    echo ""
}

# Función para verificar si un puerto está en uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Función para iniciar backend
start_backend() {
    echo "🔧 Iniciando Backend..."
    
    if check_port 3001; then
        echo "⚠️  Puerto 3001 ya está en uso. Deteniendo proceso anterior..."
        lsof -ti:3001 | xargs kill -9
        sleep 2
    fi
    
    cd backend
    if [ ! -f "start-server.sh" ]; then
        echo "❌ Error: No se encontró start-server.sh en el directorio backend"
        return 1
    fi
    
    chmod +x start-server.sh
    echo "✅ Backend iniciado en http://localhost:3001"
    echo "📊 API disponible en http://localhost:3001/api"
    echo "🔍 Health check: http://localhost:3001/api/health"
    echo ""
    echo "⏹️  Para detener el backend, presiona Ctrl+C"
    echo "=============================================="
    
    ./start-server.sh
}

# Función para iniciar frontend
start_frontend() {
    echo "🎨 Iniciando Frontend..."
    
    if check_port 5173; then
        echo "⚠️  Puerto 5173 ya está en uso. Deteniendo proceso anterior..."
        lsof -ti:5173 | xargs kill -9
        sleep 2
    fi
    
    cd frontend
    
    # Verificar si las dependencias están instaladas
    if [ ! -d "node_modules" ]; then
        echo "📦 Instalando dependencias del frontend..."
        npm install
    fi
    
    echo "✅ Frontend iniciado en http://localhost:5173"
    echo ""
    echo "⏹️  Para detener el frontend, presiona Ctrl+C"
    echo "=============================================="
    
    npm run dev
}

# Función para iniciar todo
start_all() {
    echo "🚀 Iniciando Backend y Frontend..."
    echo "=============================================="
    
    # Iniciar backend en segundo plano
    start_backend &
    BACKEND_PID=$!
    
    # Esperar un poco para que el backend se inicie
    sleep 5
    
    # Verificar que el backend esté funcionando
    if check_port 3001; then
        echo "✅ Backend funcionando correctamente"
    else
        echo "❌ Error: Backend no se pudo iniciar"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
    
    # Iniciar frontend
    start_frontend &
    FRONTEND_PID=$!
    
    # Esperar un poco para que el frontend se inicie
    sleep 5
    
    # Verificar que el frontend esté funcionando
    if check_port 5173; then
        echo "✅ Frontend funcionando correctamente"
    else
        echo "❌ Error: Frontend no se pudo iniciar"
        kill $FRONTEND_PID 2>/dev/null
        exit 1
    fi
    
    echo ""
    echo "🎉 ¡Sistema completo iniciado exitosamente!"
    echo "=============================================="
    echo "🌐 Backend:  http://localhost:3001"
    echo "🎨 Frontend: http://localhost:5173"
    echo "📊 API:      http://localhost:3001/api"
    echo ""
    echo "⏹️  Para detener todo, presiona Ctrl+C"
    
    # Esperar a que se presione Ctrl+C
    wait
}

# Función para detener servicios
stop_services() {
    echo "🛑 Deteniendo servicios..."
    
    # Detener backend
    if check_port 3001; then
        echo "🛑 Deteniendo backend en puerto 3001..."
        lsof -ti:3001 | xargs kill -9
    fi
    
    # Detener frontend
    if check_port 5173; then
        echo "🛑 Deteniendo frontend en puerto 5173..."
        lsof -ti:5173 | xargs kill -9
    fi
    
    echo "✅ Servicios detenidos"
}

# Función para mostrar estado
show_status() {
    echo "📊 Estado de los servicios:"
    echo "=============================================="
    
    if check_port 3001; then
        echo "✅ Backend:  http://localhost:3001 (ACTIVO)"
    else
        echo "❌ Backend:  http://localhost:3001 (INACTIVO)"
    fi
    
    if check_port 5173; then
        echo "✅ Frontend: http://localhost:5173 (ACTIVO)"
    else
        echo "❌ Frontend: http://localhost:5173 (INACTIVO)"
    fi
}

# Manejo de argumentos
case "${1:-all}" in
    "backend")
        start_backend
        ;;
    "frontend")
        start_frontend
        ;;
    "all")
        start_all
        ;;
    "stop")
        stop_services
        ;;
    "status")
        show_status
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        echo "❌ Comando no válido: $1"
        show_help
        exit 1
        ;;
esac
