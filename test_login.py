#!/usr/bin/env python3
import json
import urllib.request
import urllib.error

url = "http://localhost:3000/api/auth/login"
data = json.dumps({
    "email": "demo@memorias-eternas.local",
    "password": "Demo123!",
    "deviceName": "Test"
}).encode('utf-8')

headers = {
    'Content-Type': 'application/json'
}

try:
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("✅ LOGIN SUCCESS")
        print(json.dumps(result, indent=2))
except urllib.error.HTTPError as e:
    result = json.loads(e.read().decode('utf-8'))
    print(f"❌ LOGIN FAILED (HTTP {e.code})")
    print(json.dumps(result, indent=2))
except Exception as e:
    print(f"❌ ERROR: {e}")
