import 'reflect-metadata';
import { mockRestaurant, mockRestaurantList } from '@mocks/restaurant.mock';
import { RestaurantRepository } from '@repositories/restaurant.repository';
import { RestaurantService } from '@services/restaurant.service';

import { IRestaurant } from '../entities/restaurant.entity';

jest.mock('@repositories/restaurant.repository');

describe('RestaurantService', () => {
  let restaurantService: RestaurantService;
  let restaurantRepository: jest.Mocked<RestaurantRepository>;

  beforeEach(() => {
    restaurantRepository =
      new RestaurantRepository() as jest.Mocked<RestaurantRepository>;
    restaurantService = new RestaurantService(restaurantRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new restaurant successfully', async () => {
    restaurantRepository.create.mockResolvedValue(
      mockRestaurant as IRestaurant,
    );

    const result = await restaurantService.create(mockRestaurant);

    expect(restaurantRepository.create).toHaveBeenCalledWith(mockRestaurant);
    expect(result).toEqual(mockRestaurant);
  });

  it('should update a restaurant successfully', async () => {
    restaurantRepository.edit.mockResolvedValue(mockRestaurant as IRestaurant);

    const updatedRestaurant = { ...mockRestaurant, name: 'Updated Name' };
    const result = await restaurantService.update(updatedRestaurant);

    expect(restaurantRepository.edit).toHaveBeenCalledWith(updatedRestaurant);
    expect(result).toEqual(mockRestaurant);
  });

  it('should retrieve a restaurant by restaurantNumber', async () => {
    restaurantRepository.findRestaurantByRestaurantNumber.mockResolvedValue(
      mockRestaurant as IRestaurant,
    );

    const result = await restaurantService.getRestaurantByRestaurantNumber(
      mockRestaurant.restaurantNumber.toString(),
    );

    expect(
      restaurantRepository.findRestaurantByRestaurantNumber,
    ).toHaveBeenCalledWith(mockRestaurant.restaurantNumber.toString());
    expect(result).toEqual(mockRestaurant);
  });

  it('should return all restaurants with filters and pagination', async () => {
    restaurantRepository.all.mockResolvedValue(
      mockRestaurantList as IRestaurant[],
    );

    const result = await restaurantService.all({ name: 'Sushi' }, 0, 10);

    expect(restaurantRepository.all).toHaveBeenCalledWith(
      { name: 'Sushi' },
      0,
      10,
    );
    expect(result).toEqual(mockRestaurantList);
  });
});
