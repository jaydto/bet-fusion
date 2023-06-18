import React, {useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';

const LayoutLoading = React.memo(
    () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // simulate a delay to show the loading state
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="d-flex align-items-center justify-content-center text-white" style={{height: '100vh'}}>
                    <Spinner animation={'grow'} size={'lg'}/>
                </div>
            ) : (
                <div>
                    {/* your app layout */}
                </div>
            )}
        </div>
    );
});

export default LayoutLoading;
