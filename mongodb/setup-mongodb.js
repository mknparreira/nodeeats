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

db.createCollection('categories', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['categoryNumber', 'name', 'slug'],
      properties: {
        categoryNumber: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        slug: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        description: {
          bsonType: 'string',
          description: 'optional category description',
        },
        updatedAt: {
          bsonType: ['date', 'null'],
          description: 'optional date for last update',
        },
        createdAt: {
          bsonType: 'date',
          description: 'auto-generated creation date',
        },
      },
    },
  },
});

db.categories.createIndex({ categoryNumber: 1 }, { unique: true });
db.categories.createIndex({ name: 1 }, { unique: true });
db.categories.createIndex({ slug: 1 }, { unique: true });

db.createCollection('restaurants', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'restaurantNumber',
        'name',
        'email',
        'phone',
        'address',
        'categories',
        'openingHours',
        'status',
      ],
      properties: {
        restaurantNumber: {
          bsonType: 'objectId',
          description: 'must be an ObjectId and is required',
        },
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'must be a valid email address',
        },
        phone: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        description: {
          bsonType: 'string',
          description: 'optional string',
        },
        address: {
          bsonType: 'object',
          required: ['street', 'city', 'state', 'zip', 'country'],
          properties: {
            street: { bsonType: 'string' },
            city: { bsonType: 'string' },
            state: { bsonType: 'string' },
            zip: { bsonType: 'string' },
            country: { bsonType: 'string' },
          },
        },
        categories: {
          bsonType: 'array',
          items: { bsonType: 'string' },
          description: 'must be an array of strings',
        },
        openingHours: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['day', 'from', 'to'],
            properties: {
              day: {
                enum: [
                  'monday',
                  'tuesday',
                  'wednesday',
                  'thursday',
                  'friday',
                  'saturday',
                  'sunday',
                ],
              },
              from: { bsonType: 'string' },
              to: { bsonType: 'string' },
            },
          },
        },
        status: {
          enum: ['opened', 'closed', 'pending'],
          description: 'must be one of: "opened", "closed", "pending"',
        },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: ['date', 'null'] },
      },
    },
  },
});

db.restaurants.createIndex({ restaurantNumber: 1 }, { unique: true });
db.restaurants.createIndex({ name: 1 }, { unique: true });
db.restaurants.createIndex({ email: 1 }, { unique: true });

db.createCollection('menus', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['menuNumber', 'restaurantNumber', 'items'],
      properties: {
        menuNumber: {
          bsonType: 'objectId',
          description: 'must be an ObjectId and is required',
        },
        restaurantNumber: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        items: {
          bsonType: 'array',
          description: 'list of menu items and is required',
          items: {
            bsonType: 'object',
            required: ['itemNumber', 'name', 'price', 'categoryNumber'],
            properties: {
              itemNumber: {
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
              description: {
                bsonType: 'string',
                description: 'optional description of the item',
              },
              isAvailable: {
                bsonType: 'bool',
                description: 'optional availability status',
              },
              categoryNumber: {
                bsonType: 'string',
                description:
                  'category identifier. Must be a string and is required',
              },
            },
          },
        },
      },
    },
  },
});

db.menus.createIndex({ menuNumber: 1 }, { unique: true });
db.menus.createIndex({ restaurantNumber: 1 });
db.menus.createIndex({ 'items.itemNumber': 1 });
db.menus.createIndex({ 'items.categoryNumber': 1 });

db.createCollection('orders', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'orderNumber',
        'userNumber',
        'restaurantNumber',
        'items',
        'status',
      ],
      properties: {
        orderNumber: {
          bsonType: 'object',
          description: 'must be a string and is required',
        },
        userNumber: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        restaurantNumber: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        items: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['itemNumber', 'quantity'],
            properties: {
              itemNumber: {
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
        'paymentNumber',
        'orderNumber',
        'userNumber',
        'amount',
        'status',
        'paymentMethod',
      ],
      properties: {
        paymentNumber: {
          bsonType: 'object',
          description: 'must be a string and is required',
        },
        orderNumber: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        userNumber: {
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
        'deliveryNumber',
        'orderNumber',
        'courierNumber',
        'status',
        'trackingInfo',
      ],
      properties: {
        deliveryNumber: {
          bsonType: 'object',
          description: 'must be a string and is required',
        },
        orderNumber: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        courierNumber: {
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
      required: [
        'reviewNumber',
        'userNumber',
        'restaurantNumber',
        'rating',
        'comment',
      ],
      properties: {
        reviewNumber: {
          bsonType: 'object',
          description: 'must be a string and is required',
        },
        userNumber: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        restaurantNumber: {
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
      required: [
        'notificationNumber',
        'userNumber',
        'type',
        'message',
        'createdAt',
      ],
      properties: {
        notificationNumber: {
          bsonType: 'object',
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
