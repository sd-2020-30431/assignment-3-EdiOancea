import * as dayjs from 'dayjs';

class NotificationController {
  private socket;
  private groceryListItemService;

  constructor(groceryListItemService) {
    this.groceryListItemService = groceryListItemService;
  }

  public handleSocket = socket => {
    this.socket = socket;
    this.groceryListItemService.addObserver('notifications', this);
  }

  public notify(groceryListItem) {
    const exp = dayjs(groceryListItem.expirationDate);
    const cons = dayjs(groceryListItem.consumptionDate);
    const future = dayjs().add(5, 'day');

    if (cons.isAfter(exp, 'day') && future.diff(exp, 'day') <= 5) {
      this.socket.emit(
        'notification',
        { message: `${groceryListItem.name} is due soon. Consider donating it.`}
      );
    }
  }
}

export default NotificationController;
