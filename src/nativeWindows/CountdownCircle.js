import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native-windows';
import Svg, {Circle, Text} from "react-native-svg";

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
    const dashoffsetAnimRef = useRef(new Animated.Value(strokeDashoffset)).current;

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

    const animateDashoffset = () => {
        Animated.timing(dashoffsetAnimRef, {
            toValue: strokeDasharray,
            duration: timeLeft * 1000,
            useNativeDriver: true,
            fill: "freeze"
        }).start();
    }
    // <animate
        //                 attributeName="stroke-dashoffset"
        //                 begin="0s"
        //                 dur={`${timeLeft}s`}
        //                 from={strokeDashoffset}
        //                 to={strokeDasharray}
        //                 fill="freeze"
        //             />

        useEffect(() => {
                if (!activated) {
                    return;
                }
                animateDashoffset();
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
            }, [activated, timeLeft]
        );

    if (!activated) {
        return '';
    }

    const cxy = (s * 0.5).toFixed(3);

    return (
        <View>
            <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
                <Circle
                    cx={cxy}
                    cy={cxy}
                    r={r}
                    strokeWidth={(s * 0.1).toFixed(3)}
                    stroke={colorSecond}
                    fill="transparent"
                />
                <Animated.View>
                    <Circle
                        cx={cxy}
                        cy={cxy}
                        r={r}
                        strokeWidth={(s * 0.1).toFixed(3)}
                        stroke={colorMain}
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        // style={{transition: `stroke-dashoffset 1s linear`}}
                        rotation="-90"
                        origin={`${cxy}, ${cxy}`}
                        // transform='rotate(-90deg) fill-box center'
                        // style={{
                        //     transform: 'rotate(-90deg)',
                        //     transformBox: 'fill-box',
                        //     transformOrigin: 'center',
                        // }}
                    />
                </Animated.View>
            </Svg>
            <Text
                ref={timerRef}
                x="50%"
                y="55%"
                textAnchor="middle"
                alignmentBaseline="middle"
                dominantBaseline="middle"
                style={{fontSize: (s * (0.7 - 0.1 * digitsNum)).toFixed(3)}}
                fill={colorNumber}></Text>
        </View>
    );
};

export default CountdownCircle;
