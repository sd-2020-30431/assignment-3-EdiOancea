import * as dayjs from 'dayjs';

class NotificationController {
  private socket;
  private CreateGroceryListItemCommand;
  private UpdateGroceryListItemCommand;

  constructor(CreateGroceryListItemCommand, UpdateGroceryListItemCommand) {
    this.CreateGroceryListItemCommand = CreateGroceryListItemCommand;
    this.UpdateGroceryListItemCommand = UpdateGroceryListItemCommand;
  }

  public handleSocket = socket => {
    this.socket = socket;
    this.CreateGroceryListItemCommand.addObserver('notifications', this);
    this.UpdateGroceryListItemCommand.addObserver('notifications', this);
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
