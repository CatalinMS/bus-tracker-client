# Bus tracking client application

## Project description

The project is a solution for live tracking of public transport. The solution
is intended to provide an easy to use, user-friendly application that allow users to see where the
desired bus lines are in real-time, allowing them a better organization of their time, even when
they are not in the bus station.

## Technology stack

The application is composed from two major components, a Mobile Application client and a
Spring back-end server, together with a third Web application helper. 

- The mobile application is developed with **React-Native** and **Redux** as main technologies and is capable of running on both
iOS and Android. 
- The server is developed with **Spring Webflux**, using reactive programming
as main programming paradigm and **Project Reactor** as **Reactive Streams** implementation to
provide asynchronous stream processing and non-blocking back pressure. Also **Websockets** are
used to transmit the bus locations to clients using a publish-subscribe model, thus reducing the
HTTP overhead of polling. 
- The helper Web application is developed with **React** and used as a
bus locations supplier.



This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
