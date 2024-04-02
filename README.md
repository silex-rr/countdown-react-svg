# Countdown React SVG JS Library

## Overview
This library provides an easy-to-use and customizable countdown timer solution fot React, written in pure JavaScript.

## Getting Started

### Usage
Below is a simple example demonstrating how to use Circle Countdown

```js
import { CircleCountdown } from 'circle-countdown-js-library';

<CircleCountdown
    timeLeft={left}
    timeTotal={30}
    size={24}
    fromUTime={Math.floor(Date.now() / 1000)}
/>

```

