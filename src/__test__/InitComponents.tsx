import React, {Component} from 'react';
import ProgressComponent from '../component/progress/ProgressComponent';
import ProgressController from '../component/progress/ProgressController';

export interface IInitComponentsState {
    [key: string]: any;
}
export default class InitComponents extends Component<
    any,
    IInitComponentsState
> {
    private progressRef: ProgressComponent | null;
    constructor(props: any) {
        super(props);

        this.state = {};

        this.progressRef = null;
    }

    componentDidMount(): void {
        if (this.progressRef) {
            ProgressController.initialize(this.progressRef);
        }
    }

    render() {
        return (
            <ProgressComponent
                ref={ref => {
                    this.progressRef = ref;
                }}
            />
        );
    }
}
