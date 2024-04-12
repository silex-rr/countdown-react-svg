# Countdown React SVG JS Library

## Overview
This library provides an easy-to-use and customizable countdown timer solution fot React, written in pure JavaScript.

## Getting Started

### Usage
Below is a simple example demonstrating how to use Circle Countdown

```js
import { CountdownCircle } from 'countdown-react-svg';

<CountdownCircle
    timeLeft={18}
    timeTotal={30}
    size={24}
    fromUTime={Math.floor(Date.now() / 1000)}
/>

```



### Props

| Parameter         | Type          | Default Value | Description                                             |
|-------------------|---------------|---------------|---------------------------------------------------------|
| `timeLeft`        | Number        | required      | _Seconds left in timer._                                |
| `timeTotal`       | Number        | required      | _Total seconds in timer._                               |
| `size`            | Number        | required      | _Size of SVG holder in pixels._                         |
| `activated`       | Boolean       | `true`        | _Is the countdown on or off._                           |
| `fromUTime`       | Number / null | `null`        | _Unixtimestam for syncing the countdown start time._    |
| `onCompleteCallback` | Function      | `() => {}`    | _Callback that will be fired when the countdown hit 0._ |
| `colorMain`       | String        | `'#2563eb'`   | _Color for the time left circle._                       |
| `colorSecond`     | String        | `'#f87171'`   | _Color for the time passed circle._                     |
| `colorNumber`     | String        | `'#2563eb'`   | _Color for the number (seconds left)._                  |
