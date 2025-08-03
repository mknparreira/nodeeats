# Overview

This section provides an overview of the collections used in the system, including their purpose, schema validation, and key fields.

# Collections

## users

Stores user data such as personal details, authentication credentials, and contact information.

**Key Fields**:

- `userNumber`: Unique identifier for the user.
- `name`: User's name.
- `email`: User's email address.
- `password`: Encrypted user password.

## categories

Defines categories used to organize restaurants and menu items.

**Key Fields**:

- `categoryNumber`: Unique identifier for the category.
- `name`: Category´s name.
- `slug`: URL-friendly version of the category name.
- `description`: Description of the category.

## restaurants

Maintains information about restaurants, including their profiles, contact details, and operational status.

**Key Fields**:

- `restaurantNumber`: Unique identifier for the restaurant.
- `name`: Restaurant´s name.
- `categories`: List of categories the restaurant belongs.
- `status`: Current status (e.g., open or closed).

## menus

Stores the list of menu items for each restaurant, including details such as pricing, availability, and categorization.

**Key Fields**:

- `menuNumber`: Unique identifier for the menu.
- `restaurantNumber`: Reference to the associated restaurant.
- `items`: Array of items belonging to the menu. Each item includes:
  - `itemNumber`: Unique identifier for the item within the menu.
  - `name`: Menu´s name.
  - `price`: Price of the item.
  - `description`: Description of the item.
  - `isAvailable`: Indicates if the item is currently available.
  - `categoryNumber`: Category to which the item belongs.

## orders

Tracks order details, including the user who placed the order, the items ordered, and the status of the order.

**Key Fields**:

TBD

## payments

Manages payment details for orders, including the amount paid, payment method, and status.

**Key Fields**:

TBD

## deliveries

Coordinates delivery details, such as courier assignments, delivery status, and tracking information.

**Key Fields**:

TBD.

## reviews

Stores feedback and ratings provided by users for restaurants or delivery experiences.

**Key Fields**:

TBD

## notifications

Logs notification events sent to users, such as order updates or promotional messages.

**Key Fields**:

TBD
