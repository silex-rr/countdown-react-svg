import React, {useEffect, useRef} from 'react';

const CountdownCircle = ({
    timeLeft,
    timeTotal,
    size: s,
    activated = true,
    fromUTime = null,
    onCompleteCallback = () => {},
    colorMain = '#2563eb',
    colorSecond = '#f87171',
    colorNumber = '#2563eb',
}) => {
    const startedAt = fromUTime ?? Math.floor(Date.now() / 1000);
    const timerRef = useRef(undefined);
    const r = (s * 0.4).toFixed(3);
    const Pir = Math.PI * r;
    const strokeDasharray = Math.round(Pir * 3);
    const percentage = (timeTotal - timeLeft) / timeTotal;
    const strokeDashoffset = Math.round(Pir + 2 * Pir * percentage);

    const getDigitsNum = num => {
        if (num > 99) {
            return 3;
        }
        if (num > 9) {
            return 2;
        }
        return 1;
    };
    let digitsNum = getDigitsNum(timeLeft);
    const countdownFn = c => {
        timerRef.current.textContent = c;
        const digitsNumCur = getDigitsNum(c);
        if (digitsNumCur !== digitsNum) {
            digitsNum = digitsNumCur;
            timerRef.current.style.fontSize = (s * (0.7 - 0.1 * digitsNum)).toFixed(3) + 'px';
        }
    };

    useEffect(() => {
        if (!activated) {
            return;
        }
        let countdown = timeLeft;
        countdownFn(countdown);
        const interval = setInterval(() => {
            const curTime = Math.floor(Date.now() / 1000);
            const timeElapsed = curTime - startedAt;
            countdown = timeLeft - timeElapsed;
            if (countdown <= 0) {
                onCompleteCallback();
                return false;
            }
            countdownFn(countdown);
        }, 1000);
        return () => clearInterval(interval);
    }, [activated, timeLeft]);

    if (!activated) {
        return '';
    }

    return (
        <svg width={s + 'px'} height={s + 'px'}>
            <circle
                cx={(s * 0.5).toFixed(3) + 'px'}
                cy={(s * 0.5).toFixed(3) + 'px'}
                r={r + 'px'}
                strokeWidth={(s * 0.1).toFixed(3) + 'px'}
                stroke={colorSecond}
                fill="transparent"
            />
            <circle
                cx={(s * 0.5).toFixed(3) + 'px'}
                cy={(s * 0.5).toFixed(3) + 'px'}
                r={r + 'px'}
                strokeWidth={(s * 0.1).toFixed(3) + 'px'}
                stroke={colorMain}
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                // style={{transition: `stroke-dashoffset 1s linear`}}
                style={{
                    transform: 'rotate(-90deg)',
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                }}>
                <animate
                    attributeName="stroke-dashoffset"
                    begin="0s"
                    dur={`${timeLeft}s`}
                    from={strokeDashoffset}
                    to={strokeDasharray}
                    fill="freeze"
                />
            </circle>
            <text
                ref={timerRef}
                x="50%"
                y="55%"
                textAnchor="middle"
                alignmentBaseline="middle"
                dominantBaseline="middle"
                style={{fontSize: (s * (0.7 - 0.1 * digitsNum)).toFixed(3) + 'px'}}
                fill={colorNumber}></text>
        </svg>
    );
};
export default CountdownCircle;
