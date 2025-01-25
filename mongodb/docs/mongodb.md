# Overview

This section provides an overview of the collections used in the system, including their purpose, schema validation, and key fields.

# Collections

## users

Stores user data such as personal details, authentication credentials, and contact information.

**Key Fields**:

- userId: Unique identifier for the user.
- name: User's name.
- email: User's email address.
- password: Encrypted user password.

## restaurants

Maintains information about restaurants, including their profiles, contact details, and operational status.

**Key Fields**:

- restaurantId: Unique identifier for the restaurant.
- name: Restaurant name.
- categories: List of categories the restaurant belongs to.
- status: Current status (e.g., open or closed).

## menus

Stores the menu items for each restaurant, including details such as pricing and availability.

**Key Fields**:

- menuId: Unique identifier for the menu item.
- restaurantId: Reference to the associated restaurant.
- name: Name of the menu item.
- price: Price of the item.

## categories

Defines categories used to organize restaurants and menu items.

**Key Fields**:

- categoryId: Unique identifier for the category.
- name: Category name.

## orders

Tracks order details, including the user who placed the order, the items ordered, and the status of the order.

**Key Fields**:

- orderId: Unique identifier for the order.
- userId: Reference to the user who placed the order.
- items: List of items included in the order.
- status: Current status of the order (e.g., pending, completed).

## payments

Manages payment details for orders, including the amount paid, payment method, and status.

**Key Fields**:

- paymentId: Unique identifier for the payment.
- orderId: Reference to the associated order.
- amount: Total payment amount.
- status: Payment status (e.g., completed, failed).

## deliveries

Coordinates delivery details, such as courier assignments, delivery status, and tracking information.

**Key Fields**:

- deliveryId: Unique identifier for the delivery.
- orderId: Reference to the associated order.
- status: Current delivery status.
- trackingInfo: Real-time tracking details.

## reviews

Stores feedback and ratings provided by users for restaurants or delivery experiences.

**Key Fields**:

- reviewId: Unique identifier for the review.
- userId: Reference to the user leaving the review.
- rating: Numeric rating (e.g., 1–5).
- comment: Optional feedback text.

## notifications

Logs notification events sent to users, such as order updates or promotional messages.

**Key Fields**:

- notificationId: Unique identifier for the notification.
- userId: Reference to the recipient user.
- type: Type of notification (e.g., order update).
- message: Content of the notification.
