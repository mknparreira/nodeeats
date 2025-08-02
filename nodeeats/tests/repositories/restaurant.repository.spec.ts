import 'reflect-metadata';
import { RestaurantEntity } from '@entities/restaurant.entity';
import { mockRestaurant, mockRestaurantList } from '@mocks/restaurant.mock';
import { RestaurantRepository } from '@repositories/restaurant.repository';

jest.mock('@entities/restaurant.entity');

describe('RestaurantRepository', () => {
  let restaurantRepository: RestaurantRepository;

  beforeEach(() => {
    restaurantRepository = new RestaurantRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new restaurant', async () => {
    (RestaurantEntity.create as jest.Mock).mockResolvedValue(mockRestaurant);

    const result = await restaurantRepository.create(mockRestaurant);

    expect(RestaurantEntity.create).toHaveBeenCalledWith(
      expect.objectContaining(mockRestaurant),
    );
    expect(result).toEqual(mockRestaurant);
  });

  it('should find a restaurant by restaurantNumber', async () => {
    (RestaurantEntity.findOne as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockRestaurant),
    });

    const result = await restaurantRepository.findRestaurantByRestaurantNumber(
      mockRestaurant.restaurantNumber.toString(),
    );

    expect(RestaurantEntity.findOne).toHaveBeenCalledWith({
      restaurantNumber: mockRestaurant.restaurantNumber.toString(),
    });

    expect(result).toEqual(mockRestaurant);
  });

  it('should update a restaurant', async () => {
    (RestaurantEntity.findOneAndUpdate as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockRestaurant),
    });

    const result = await restaurantRepository.edit({
      restaurantNumber: mockRestaurant.restaurantNumber,
      name: 'Updated Sushi Place',
    });

    expect(RestaurantEntity.findOneAndUpdate).toHaveBeenCalledWith(
      { restaurantNumber: mockRestaurant.restaurantNumber },
      {
        restaurantNumber: mockRestaurant.restaurantNumber,
        name: 'Updated Sushi Place',
      },
      { new: true },
    );
    expect(result).toEqual(mockRestaurant);
  });

  it('should return all restaurants with filters and pagination', async () => {
    (RestaurantEntity.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockRestaurantList),
    });

    const result = await restaurantRepository.all({ name: 'Sushi' }, 0, 10);

    expect(RestaurantEntity.find).toHaveBeenCalledWith({
      name: { $regex: 'Sushi', $options: 'i' },
    });
    expect(result).toEqual(mockRestaurantList);
  });
});
