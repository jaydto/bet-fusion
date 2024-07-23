// import React, { useEffect, useState } from 'react';
// import Odometer from 'react-odometerjs';

// const WinCounter = ({counter}) => {
//     const [value, setValue] = useState(counter);

//     useEffect(() => {
//         const timeoutId = setTimeout(() => setValue(counter), 2000);
//         return () => {
//             clearTimeout(timeoutId);
//         };
//     }, []);

//     return <Odometer value={value} format="(ddd.d),dd" />;
// }

// export default WinCounter
import React, { useEffect, useState } from 'react';
import Odometer from 'react-odometerjs';

const WinCounter = ({ counter }) => {
    const [value, setValue] = useState(counter);
    const [isIncrementing, setIsIncrementing] = useState(true);

    useEffect(() => {
        let intervalId;

        const incrementValue = () => {
            setValue(prevValue => prevValue + 1000);
        };

        const decrementValue = () => {
            setValue(prevValue => Math.max(prevValue - 500, 0));
        };

        // Initial interval to increment value every 3 seconds
        intervalId = setInterval(incrementValue, 3000);

        // Timeout to switch to decrementing after 39 seconds
        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            setIsIncrementing(false);
            intervalId = setInterval(decrementValue, 3000);
        }, 39000);

        // Cleanup intervals and timeout on unmount
        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

    return <Odometer value={value} format="(ddd.d),dd" />;
};

export default WinCounter;


// import React, { useEffect, useState } from 'react';
// import Odometer from 'react-odometerjs';

// const WinCounter = ({ counter }) => {
//     const [value, setValue] = useState(counter);

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setValue(prevValue => prevValue + 1000);
//         }, 1000);

//         return () => {
//             clearInterval(intervalId);
//         };
//     }, []);

//     return <Odometer value={value} format="(ddd.d),dd" />;
// }

// export default WinCounter;

