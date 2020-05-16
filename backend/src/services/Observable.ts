class Observable {
    public observers;
  
    constructor() {
        this.observers = {};
    }
  
    public addObserver = (key: string, observer) => {
        this.observers[key] = observer;
    }
  
    public removeObserver = (key: string) => {
        this.observers[key] = null;
    }
  
    protected notifyObservers = value => {
        Object.values(this.observers).forEach((observer: any) => {
            observer.notify(value);
        });
    }
};
  
export default Observable;
  