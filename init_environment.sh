#!/bin/bash

# Mocking 설정 입력 받기
read -p "Mocking을 사용하나요? Y|N: " MOCKING_INPUT
if [[ "$MOCKING_INPUT" =~ ^[Yy]$ ]]; then
  NEXT_PUBLIC_API_MOCKING="enabled"
else
  NEXT_PUBLIC_API_MOCKING="disabled"
fi

# API URL 설정 입력 받기 (기본값: localhost:3000)
read -p "서버 주소를 입력해주세요 (기본값: localhost:3000): " NEXT_PUBLIC_API_URL
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:3000}

# .env 파일에 변수 작성
cat << EOF > .env
NEXT_PUBLIC_API_MOCKING="$NEXT_PUBLIC_API_MOCKING"
NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL"
EOF

echo ".env file created with NEXT_PUBLIC_API_MOCKING set to $NEXT_PUBLIC_API_MOCKING and NEXT_PUBLIC_API_URL set to $NEXT_PUBLIC_API_URL."