db = db.getSiblingDB('nodeeats');

db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'phone', 'password'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'must be a ObjectId and is required',
        },
        userNumber: {
          bsonType: 'objectId',
          description: 'must be an ObjectId and is generated automatically',
        },
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'must be a valid email format and is required',
        },
        phone: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        password: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
      },
    },
  },
});

db.users.createIndex({ userNumber: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });

db.createCollection('restaurants', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['restaurantId', 'name', 'address', 'categories', 'status'],
      properties: {
        restaurantId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        address: {
          bsonType: 'object',
          required: ['street', 'city', 'zipCode'],
          properties: {
            street: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            city: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            zipCode: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
          },
        },
        categories: {
          bsonType: 'array',
          items: {
            bsonType: 'string',
            description: 'must be an array of strings',
          },
        },
        status: {
          enum: ['open', 'closed'],
          description: 'must be either "open" or "closed"',
        },
      },
    },
  },
});

db.createCollection('menus', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['menuId', 'restaurantId', 'items'],
      properties: {
        menuId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        restaurantId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        items: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['itemId', 'name', 'price'],
            properties: {
              itemId: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              name: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              price: {
                bsonType: 'number',
                description: 'must be a number and is required',
              },
            },
          },
        },
      },
    },
  },
});

db.createCollection('categories', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['categoryId', 'name'],
      properties: {
        categoryId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
      },
    },
  },
});

db.createCollection('orders', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['orderId', 'userId', 'restaurantId', 'items', 'status'],
      properties: {
        orderId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        userId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        restaurantId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        items: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['itemId', 'quantity'],
            properties: {
              itemId: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              quantity: {
                bsonType: 'int',
                minimum: 1,
                description:
                  'must be an integer greater than 0 and is required',
              },
            },
          },
        },
        status: {
          enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
          description: 'must be one of the defined statuses',
        },
      },
    },
  },
});

db.createCollection('payments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'paymentId',
        'orderId',
        'userId',
        'amount',
        'status',
        'paymentMethod',
      ],
      properties: {
        paymentId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        orderId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        userId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        amount: {
          bsonType: 'number',
          minimum: 0,
          description:
            'must be a number greater than or equal to 0 and is required',
        },
        status: {
          enum: ['pending', 'completed', 'failed', 'refunded'],
          description: 'must be one of the defined statuses',
        },
        paymentMethod: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
      },
    },
  },
});

db.createCollection('deliveries', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'deliveryId',
        'orderId',
        'courierId',
        'status',
        'trackingInfo',
      ],
      properties: {
        deliveryId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        orderId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        courierId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        status: {
          enum: ['pending', 'in-transit', 'delivered', 'failed'],
          description: 'must be one of the defined statuses',
        },
        trackingInfo: {
          bsonType: 'object',
          required: ['latitude', 'longitude'],
          properties: {
            latitude: {
              bsonType: 'double',
              description: 'must be a number representing latitude',
            },
            longitude: {
              bsonType: 'double',
              description: 'must be a number representing longitude',
            },
          },
        },
      },
    },
  },
});

db.createCollection('reviews', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['reviewId', 'userId', 'restaurantId', 'rating', 'comment'],
      properties: {
        reviewId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        userId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        restaurantId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        rating: {
          bsonType: 'int',
          minimum: 1,
          maximum: 5,
          description: 'must be an integer between 1 and 5',
        },
        comment: {
          bsonType: 'string',
          description: 'must be a string and is optional',
        },
      },
    },
  },
});

db.createCollection('notifications', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['notificationId', 'userId', 'type', 'message', 'createdAt'],
      properties: {
        notificationId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        userId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        type: {
          bsonType: 'string',
          description:
            'must be a string indicating the type of notification and is required',
        },
        message: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        createdAt: {
          bsonType: 'date',
          description: 'must be a date and is required',
        },
      },
    },
  },
});
