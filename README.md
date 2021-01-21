# react-native-wasm-rust
Trying to run rust on react native so i can share Rust code between mobile, backend and web environments

# Setting up
1 - First you need to install [wasm-pack](https://github.com/rustwasm/wasm-pack)

2 - Then you need to install [binaryen](https://github.com/WebAssembly/binaryen)
2.1 - You can install it with apt-get or brew if you are in Linux or a Mac

3 - Install rust and [rustup](https://rustup.rs/)

# How it works
What we do is create bindings between javascript and Rust using [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/) so we can later convert the generated wasm to Javascript

It's actually really easy, what we do is convert the web assembly code to Javascript and then we can import the javascript file in react native. So we can run our "rust code" in react native without issues. (Notice that there are performance penalties when not running in WebAssembly, but since the idea is to share code this is not a real issue)

# Issues
Be aware that some browser native APIs WILL NOT WORK in React Native environment.