import React, {Component} from 'react';
import { Alert } from '@material-ui/lab';


class ErrorBoundry extends Component {
    constructor(props){
        super(props);

        this.state = {
            hasError : false

        }
    }

    static getDerivedStateFromError(error){
        return{
            hasError : true
            
        }
    }

    render(){
        if(this.state.hasError){
            return (
                <div >
                    <Alert className='error-box' variant="filled" severity="error">
                        Something went wrong — Please reload...
                    </Alert>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundry
