import {BehaviorSubject, Observable} from "rxjs";

class AppService {
    private pageTitleSubject = new BehaviorSubject<string>('');
    pageTitle$ : Observable<string> = this.pageTitleSubject.asObservable();

    /** NOTE: api request loader */
    private isLoadingSubject = new BehaviorSubject<boolean>(false)
    isLoading$ : Observable<boolean> = this.isLoadingSubject.asObservable();

    setPageTitle = (title: string) => {
        this.pageTitleSubject.next(title)
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoadingSubject.next(isLoading)
    }
}

export const appService :AppService = new AppService();
