const { spawn } = require('child_process')
const path = require('path')
const Watchpack = require('watchpack')

let compiled = false

let wasm2JSOutputFile = null
let crateDirectory = ''
let wasmPackBin = 'wasm-pack'

let crateName = ''
let wasmFilePath = ''
let wasm2JSOutput = ''
    

const compile = async () => {
    await compileRust()
    await compileWasm2JS()
    await changeFiles() 
    compiled = true
}

const compileRust = () => {
    const bin = wasmPackBin

    const args = [
        'build'
    ]

    const options = {
        cwd: crateDirectory,
        stdio: "inherit"
    }
    return runProcess(bin, args, options)
}

const compileWasm2JS = () => {
    const bin = 'wasm2js'
    const args = [
        wasmFilePath,
        '-o', wasm2JSOutput
    ]
    const options = {
        cwd: crateDirectory,
        stdio: "inherit"
    }
    return runProcess(bin, args, options)
}

const changeFiles = () => {
    const fs = require('fs')
    
    const filesToVerify = [crateDirectory + '/pkg/' + crateName + '.js', crateDirectory + '/pkg/' + crateName + '_bg.js']
    filesToVerify.forEach(filePath => {
        fs.readFile(filePath, 'utf8', function (err,data) {
            if (err) {
                return console.log(err)
            }
            data = data.replace(`import * as wasm from "./${crateName}_bg.wasm";`, '')
            data = data.replace(`import * as wasm from './${crateName}_bg.wasm';`, '')
            data = data.replace(/wasm\./g, `require('./${(wasm2JSOutputFile || crateName + '_bg__') + '.js'}').`)
            fs.writeFile(filePath, data, function (err) {
                if (err) throw err
            })
        })
    })
}

const runProcess = (bin, args, options) => {
    return new Promise((resolve, reject) => {
        const p = spawn(bin, args, options)
  
        p.on('close', code => {
            if (code === 0) {
                resolve()
            } else {
                reject(new Error("Rust compilation."))
            }
        })
        p.on('error', reject)
    })
}

module.exports = (appConfig = {}) => {
    const watch = new Watchpack()
    crateDirectory = appConfig.withWasm.crateDirectory
    wasm2JSOutputFile = appConfig.withWasm?.wasm2JSOutputFile || wasm2JSOutputFile
    wasmPackBin = appConfig.withWasm?.wasmPackBin || wasmPackBin
    crateName = process.platform === "win32" ? crateDirectory.split("\\")[crateDirectory.split("\\").length-1] :
        crateDirectory.split("/")[crateDirectory.split("/").length-1]
    wasmFilePath = crateDirectory + '/pkg/' + crateName + '_bg.wasm'
    wasm2JSOutput = crateDirectory + '/pkg/' + (wasm2JSOutputFile || crateName + '_bg__') + '.js'
    
    if (!compiled) {
        compile()
        let isRecompiling = false
        watch.watch(
            [path.resolve(crateDirectory, 'Cargo.toml')], 
            [].concat(path.resolve(crateDirectory, 'src')), 
            Date.now() - 10000
        )
    
        watch.on('change', () => {
            isRecompiling = true
            if (isRecompiling) {
                
            }
            console.log('ℹ️  Recompiling... \n')
            compile()
        })
    }
    return appConfig
}