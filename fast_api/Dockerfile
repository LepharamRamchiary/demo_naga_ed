# ---- Stage 1: build dependencies into a virtual environment ----
FROM python:3.12-slim AS builder
WORKDIR /app

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ---- Stage 2: final runtime image ----
FROM python:3.12-slim AS runner
WORKDIR /app

# Copy the prebuilt virtual environment from the builder stage
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY . .

# Create a non-root user and hand it ownership of the app + venv
RUN addgroup --system app && adduser --system --group app \
    && chown -R app:app /opt/venv /app
USER app

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/')" || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--root-path", "/ai"]