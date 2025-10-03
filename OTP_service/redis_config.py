from redis import Redis

# Redis chạy local:6379
redis_client = Redis(host="localhost", port=6379, db=0, decode_responses=True)

# testing connection
redis_client.set("hello", "world", ex=60)  # ex=60s (TTL)
print(redis_client.get("hello"))
