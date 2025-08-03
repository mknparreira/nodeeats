import 'reflect-metadata';

import { Request, Response } from 'express';

import { RestaurantResponseDto } from '@dto/responses/restaurantResponse.dto';
import { IRestaurant } from '@entities/restaurant.entity';
import { RestaurantHandler } from '@handlers/restaurant.handler';
import { mockRestaurant, mockRestaurantList } from '@mocks/restaurant.mock';
import { RestaurantRepository } from '@repositories/restaurant.repository';
import { RestaurantService } from '@services/restaurant.service';
import {
  CreateRestaurantValidate,
  UpdateRestaurantValidate,
} from '@validates/restaurant.validate';

jest.mock('@services/restaurant.service');

describe('RestaurantHandler', () => {
  let restaurantHandler: RestaurantHandler;
  let restaurantService: jest.Mocked<RestaurantService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    const restaurantRepository = {} as jest.Mocked<RestaurantRepository>;
    restaurantService = new RestaurantService(
      restaurantRepository,
    ) as jest.Mocked<RestaurantService>;
    restaurantHandler = new RestaurantHandler(restaurantService);

    req = {
      body: mockRestaurant,
      params: {
        restaurantNumber: mockRestaurant.restaurantNumber.toString(),
      },
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new restaurant', async () => {
    restaurantService.create.mockResolvedValue(mockRestaurant as IRestaurant);

    await restaurantHandler.create(req as Request, res as Response);

    expect(restaurantService.create).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new RestaurantResponseDto(mockRestaurant as IRestaurant),
    });
  });

  it('should update a restaurant', async () => {
    req.body = {
      restaurantNumber: mockRestaurant.restaurantNumber.toString(),
      name: 'Updated Name',
    };

    restaurantService.update.mockResolvedValue(mockRestaurant as IRestaurant);

    await restaurantHandler.update(req as Request, res as Response);

    expect(restaurantService.update).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new RestaurantResponseDto(mockRestaurant as IRestaurant),
    });
  });

  it('should return error if updating a non-existing restaurant', async () => {
    req.body = {
      restaurantNumber: mockRestaurant.restaurantNumber.toString(),
      name: 'Updated Name',
    };

    restaurantService.update.mockResolvedValue(null);

    await restaurantHandler.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Restaurant not found' });
  });

  it('should get a restaurant by restaurantNumber', async () => {
    restaurantService.getRestaurantByRestaurantNumber.mockResolvedValue(
      mockRestaurant as IRestaurant,
    );

    await restaurantHandler.getRestaurantByRestaurantNumber(
      req as Request,
      res as Response,
    );

    expect(
      restaurantService.getRestaurantByRestaurantNumber,
    ).toHaveBeenCalledWith(mockRestaurant.restaurantNumber.toString());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new RestaurantResponseDto(mockRestaurant as IRestaurant),
    });
  });

  it('should return 404 if restaurant is not found by restaurantNumber', async () => {
    restaurantService.getRestaurantByRestaurantNumber.mockResolvedValue(null);

    await restaurantHandler.getRestaurantByRestaurantNumber(
      req as Request,
      res as Response,
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Restaurant not found' });
  });

  it('should return all restaurants', async () => {
    restaurantService.all.mockResolvedValue(
      mockRestaurantList as IRestaurant[],
    );

    await restaurantHandler.all(req as Request, res as Response);

    expect(restaurantService.all).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: mockRestaurantList.map(
        restaurant => new RestaurantResponseDto(restaurant as IRestaurant),
      ),
    });
  });

  describe('CreateRestaurantValidate schema', () => {
    it('should fail when name is empty', () => {
      const result = CreateRestaurantValidate.safeParse({
        name: '',
        email: 'valid@email.com',
        phone: '12345678',
        categories: ['sushi'],
        address: {
          street: 'Rua 1',
          city: 'Lisboa',
          state: 'Lisboa',
          zip: '1200-000',
          country: 'Portugal',
        },
        openingHours: [{ day: 'monday', from: '12:00', to: '22:00' }],
        status: 'opened',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.name).toBeDefined();
      }
    });
  });

  describe('UpdateRestaurantValidate schema', () => {
    it('should fail when restaurantNumber is missing', () => {
      const result = UpdateRestaurantValidate.safeParse({
        name: 'New name',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.flatten().fieldErrors.restaurantNumber,
        ).toBeDefined();
      }
    });
  });
});
