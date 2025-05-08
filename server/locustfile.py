from locust import HttpUser, task, between
from datetime import datetime

class WebsiteUser(HttpUser):
    host = "http://localhost:9000"
    wait_time = between(1, 5)

    def on_start(self):
        # Register a user at the beginning and store the user_id
        user_data = {
            "name": "Test User",
            "email": f"testuser_{int(datetime.utcnow().timestamp())}@gmail.com",
            "phoneNumber": "0912784548",
            "address": "Test Address",
            "subcity": "Yeka",
            "city": "Addis",
            "password": "Itgoes@123"
        }
        response = self.client.post("/users", json=user_data)
        if response.status_code == 201:
            self.user_id = response.json().get("_id")

    @task(1)
    def get_products_list(self):
        with self.client.get("/products", catch_response=True) as response:
            if response.status_code != 200:
                response.failure(f"GET /products failed with {response.status_code}")

    @task(2)
    def get_categories(self):
        with self.client.get("/category", catch_response=True) as response:
            if response.status_code != 200:
                response.failure(f"GET /category failed with {response.status_code}")

    @task(3)
    def get_single_product(self):
        with self.client.get("/products/681b5498cc0cb128f8b97a1a", catch_response=True) as response:
            if response.status_code != 200:
                response.failure(f"GET single product failed with {response.status_code}")

    @task(2)
    def get_orders(self):
        with self.client.get("/orders", catch_response=True) as response:
            if response.status_code != 200:
                response.failure(f"GET /orders failed with {response.status_code}")

    @task(1)
    def post_order(self):
        if not hasattr(self, "user_id"):
            return
        order_data = {
            "user": self.user_id,
            "orderDate": datetime.utcnow().isoformat() + "Z",
            "status": "pending",
            "items": [{
                "product": "653f75c4c7945e990f53cf19",
                "quantity": 2,
                "price": 25.99
            }],
            "paymentMethod": "Credit Card",
            "paymentStatus": "pending",
            "totalAmount": 51.98,
            "shippingFee": 5.00,
            "orderNotes": "Test Order"
        }
        with self.client.post("/orders", json=order_data, catch_response=True) as response:
            if response.status_code != 201:
                response.failure(f"POST /orders failed with {response.status_code}")

    @task(1)
    def add_product(self):
        product_data = {
            "name": "Test Product",
            "description": "A test product",
            "price": 49.99,
            "category": "Test Category",
            "stock": 100
        }
        with self.client.post("/products", json=product_data, catch_response=True) as response:
            if response.status_code != 201:
                response.failure(f"POST /products failed with {response.status_code}")

    @task(1)
    def login_user(self):
        if not hasattr(self, "user_id"):
            return
        login_data = {
            "email": f"testuser_{self.user_id}@gmail.com",
            "password": "Itgoes@123"
        }
        with self.client.post("/auth/login", json=login_data, catch_response=True) as response:
            if response.status_code != 200:
                response.failure(f"POST /auth/login failed with {response.status_code}")

class StressTestUser(HttpUser):
    wait_time = between(0.1, 0.5)

    def on_start(self):
        user_data = {
            "name": "Stress User",
            "email": f"stressuser_{int(datetime.utcnow().timestamp())}@gmail.com",
            "phoneNumber": "0912784548",
            "address": "Stress Address",
            "subcity": "Yeka",
            "city": "Addis",
            "password": "Itgoes@123"
        }
        response = self.client.post("/users", json=user_data)
        if response.status_code == 201:
            self.user_id = response.json().get("_id")

    @task
    def stress_products_list(self):
        self.client.get("/products")

    @task
    def stress_single_product(self):
        self.client.get("/products/681b5498cc0cb128f8b97a1a")

    @task
    def stress_categories(self):
        self.client.get("/category")

    @task
    def stress_post_order(self):
        if not hasattr(self, "user_id"):
            return
        order_data = {
            "user": self.user_id,
            "orderDate": datetime.utcnow().isoformat() + "Z",
            "status": "pending",
            "items": [{
                "product": "653f75c4c7945e990f53cf19",
                "quantity": 1,
                "price": 25.99
            }],
            "paymentMethod": "Credit Card",
            "paymentStatus": "pending",
            "totalAmount": 25.99,
            "shippingFee": 5.00,
            "orderNotes": "Stress Test Order"
        }
        self.client.post("/orders", json=order_data)

    @task
    def stress_add_product(self):
        product_data = {
            "name": "Stress Product",
            "description": "Stress test product",
            "price": 39.99,
            "category": "Stress Category",
            "stock": 200
        }
        self.client.post("/products", json=product_data)

class SpikeTestUser(HttpUser):
    wait_time = between(0.1, 2)

    def on_start(self):
        user_data = {
            "name": "Spike User",
            "email": f"spikeuser_{int(datetime.utcnow().timestamp())}@gmail.com",
            "phoneNumber": "0912784548",
            "address": "Spike Address",
            "subcity": "Yeka",
            "city": "Addis",
            "password": "Itgoes@123"
        }
        response = self.client.post("/users", json=user_data)
        if response.status_code == 201:
            self.user_id = response.json().get("_id")

    @task(2)
    def spike_products_list(self):
        for _ in range(10):
            self.client.get("/products")

    @task(2)
    def spike_single_product(self):
        for _ in range(10):
            self.client.get("/products/681b5498cc0cb128f8b97a1a")

    @task(2)
    def spike_categories(self):
        for _ in range(10):
            self.client.get("/category")

    @task(2)
    def spike_post_orders(self):
        if not hasattr(self, "user_id"):
            return
        for i in range(10):
            order_data = {
                "user": self.user_id,
                "orderDate": datetime.utcnow().isoformat() + "Z",
                "status": "pending",
                "items": [{
                    "product": "653f75c4c7945e990f53cf19",
                    "quantity": 1,
                    "price": 25.99
                }],
                "paymentMethod": "Credit Card",
                "paymentStatus": "pending",
                "totalAmount": 25.99,
                "shippingFee": 5.00,
                "orderNotes": f"Spike Order {i}"
            }
            self.client.post("/orders", json=order_data)

    @task(2)
    def spike_add_products(self):
        for i in range(10):
            product_data = {
                "name": f"Spike Product {i}",
                "description": "Spike test product",
                "price": 39.99 + i,
                "category": "Spike Category",
                "stock": 100 + i
            }
            self.client.post("/products", json=product_data)
