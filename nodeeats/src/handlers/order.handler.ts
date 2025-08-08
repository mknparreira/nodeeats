import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { NotFoundError } from '@customErrors/notFound.error';
import { OrderFilter } from '@customTypes/orderFilter.type';
import { CreateOrderRequestDto } from '@dto/requests/createOrderRequest.dto';
import { OrderResponseDto } from '@dto/responses/orderResponse.dto';
import { IOrder } from '@entities/order.entity';
import { OrderService } from '@services/order.service';
import { handleRequest } from '@utils/handleRequest.util';
import { pagination } from '@utils/pagination.util';

@injectable()
export class OrderHandler {
  constructor(
    @inject(OrderService)
    private orderService: OrderService,
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const createDto = new CreateOrderRequestDto(req.body);
      const order = await this.orderService.create(createDto);
      return new OrderResponseDto(order);
    });
  }
  public async getOrderByOrderNumber(
    req: Request,
    res: Response,
  ): Promise<Response> {
    return handleRequest(res, async () => {
      const order = await this.orderService.getOrderByOrderNumber(
        req.params.orderNumber,
      );
      if (!order) throw new NotFoundError('Order not found');

      return new OrderResponseDto(order);
    });
  }

  public async all(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const filter: OrderFilter = {
        orderNumber: req.query.orderNumber as string,
        userNumber: req.query.userNumber as string,
        restaurantNumber: req.query.restaurantNumber as string,
        status: req.query.status as string,
        sortBy: req.query.sortBy as string,
        order: req.query.order as 'asc' | 'desc',
      };
      const { skip, limit } = pagination(req.query);
      const orders = await this.orderService.all(filter, skip, limit);

      return orders.map((order: IOrder) => new OrderResponseDto(order));
    });
  }
}
