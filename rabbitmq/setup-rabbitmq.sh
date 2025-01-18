#!/bin/bash
# setup-rabbitmq.sh

# Config variable
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'

# Functions
log() {
    echo -e "${GREEN}$(date +'%Y-%m-%d %H:%M:%S') - $1${CYAN}"
}

log_error() {
    echo -e "${RED}$(date +'%Y-%m-%d %H:%M:%S') - ERROR: $1${CYAN}"
}

check_success() {
    if [ $? -ne 0 ]; then
        log_error "$1"
        exit 1
    fi
}

log "Waiting for RabbitMQ starting on ${RABBITMQ_HOST}:${RABBITMQ_PORT}..."
while ! curl -s http://${RABBITMQ_HOST}:${RABBITMQ_PORT}/api/overview > /dev/null; do
    log "The RabbitMQ is not responding. Just waiting..."
    sleep ${WAIT_TIME}
done

log "The RabbitMQ is up and running."

# Create admin user
log "Creating RabbitMQ admin user..."
rabbitmqctl add_user $RABBITMQ_USER $RABBITMQ_PASSWORD
check_success "Failed to create RabbitMQ user."

rabbitmqctl set_user_tags $RABBITMQ_USER administrator
check_success "Failed to set user tags."

rabbitmqctl set_permissions -p / $RABBITMQ_USER ".*" ".*" ".*"
check_success "Failed to set permissions."

# Create exchanges
log "Declaring exchanges..."
rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare exchange name=order_exchange type=direct
check_success "Failed to declare exchange order_exchange."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare exchange name=notification_exchange type=fanout
check_success "Failed to declare exchange notification_exchange."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare exchange name=restaurant_exchange type=topic
check_success "Failed to declare exchange restaurant_exchange."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare exchange name=delivery_exchange type=direct
check_success "Failed to declare exchange delivery_exchange."

# Create queues
log "Declaring queues..."
rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare queue name=order_created
check_success "Failed to declare queue order_created."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare queue name=order_paid
check_success "Failed to declare queue order_paid."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare queue name=notification_email
check_success "Failed to declare queue notification_email."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare queue name=notification_push
check_success "Failed to declare queue notification_push."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare queue name=menu_updated
check_success "Failed to declare queue menu_updated."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare queue name=delivery_assigned
check_success "Failed to declare queue delivery_assigned."

# Create bindings
log "Declaring bindings..."
rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare binding source=order_exchange destination=order_created routing_key=order.created
check_success "Failed to declare binding for order_created."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare binding source=order_exchange destination=order_paid routing_key=order.paid
check_success "Failed to declare binding for order_paid."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare binding source=notification_exchange destination=notification_email
check_success "Failed to declare binding for notification_email."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare binding source=notification_exchange destination=notification_push
check_success "Failed to declare binding for notification_push."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare binding source=restaurant_exchange destination=menu_updated routing_key=menu.updated
check_success "Failed to declare binding for menu_updated."

rabbitmqadmin -u $RABBITMQ_USER -p $RABBITMQ_PASSWORD declare binding source=delivery_exchange destination=delivery_assigned routing_key=delivery.assigned
check_success "Failed to declare binding for delivery_assigned."

log "The RabbitMQ setup was completed successfully."
