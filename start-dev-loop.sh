#!/bin/bash
# Script para mantener el servidor corriendo

while true; do
  echo "Iniciando servidor..."
  npm run dev
  echo "Servidor terminó, reiniciando en 5 segundos..."
  sleep 5
done
