import ProgressComponent, {IProgressTaskProps} from './ProgressComponent';

export default {
    currentRef: {} as ProgressComponent,
    initialize(ref: ProgressComponent) {
        this.currentRef = ref;
    },
    show(
        promiseFunction: IProgressTaskProps['promiseFunction'],
        onSuccess: IProgressTaskProps['onSuccess'],
        onError?: IProgressTaskProps['onError'],
        handleError?: IProgressTaskProps['handleError'],
    ) {
        this.currentRef &&
            this.currentRef.show &&
            this.currentRef.show(
                promiseFunction,
                onSuccess,
                onError,
                handleError,
            );
    },
};
