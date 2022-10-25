/**
 * @file neutralino.d.ts
 * @author RichardDorian
 * @license MIT License
 *
 * Copyright (c) 2022 Richard Dorian
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * @description NeutralinoJS native API type definitions
 *
 * How to make VSCode read this file?
 * 1. Place this file in the root folder
 *    of your NeutralinoJS project
 * 2. Open any file you want to have typings
 *    in and type add following line at
 *    the top of the file:
 *    /// <reference path="../../neutralino.d.ts" />
 */

/**
 * Neutralinojs offers a JavaScript client library (also known as Neutralino.js) for developers to
 * interact with native operations via the Neutralinojs server. The JavaScript client's implementation
 * resides inside the neutralino.js JavaScript file. It is therefore required to have the client library
 * in your Neutralinojs projects.
 *
 * The client library exposes its JavaScript APIs to the browser's window scope, and you can access them
 * via `Neutralino` or `window.Neutralino` from vanilla JavaScript or any frontend framework.
 *
 * Assume that you need to get an environment variable value from the operating system. You can call
 * the `Neutralino.os.getEnv` JavaScript method. The client library will call the Neutralinojs server
 * with a WebSocket message once you invoke the `getEnv` method. After that, the Neutralinojs server
 * will execute the native operation to fetch the given environment variable. Once the Neutralinojs
 * server finishes the task, it sends a WebSocket message with the value of the environment variable.
 * Finally, the client library resolves a promise with the results received from the server.
 *
 * The client library maintains a task pool to map the server messages to the matching request via an
 * UUID string.
 *
 * Neutralinojs offers many native operations for you by using this communication mechanism for
 * all [modes](https://neutralino.js.org/docs/configuration/modes/).
 *
 * **Native API namespaces:**
 * - `Neutralino.app`
 * - `Neutralino.clipboard`
 * - `Neutralino.computer`
 * - `Neutralino.debug`
 * - `Neutralino.events`
 * - `Neutralino.extensions`
 * - `Neutralino.filesystem`
 * - `Neutralino.init`
 * - `Neutralino.os`
 * - `Neutralino.storage`
 * - `Neutralino.updater`
 * - `Neutralino.window`
 */
declare namespace Neutralino {
  /** `Neutralino.app` namespace contains methods related to the current application instance. */
  const app: {
    /**
     * Terminates the running application.
     * @param exitCode Process's exit code. The default value is always `0` (success).
     * @example
     * await Neutralino.app.exit(130);
     *
     * await Neutralino.app.exit();
     */
    exit(exitCode?: number): Promise<void>;
    /**
     * Kills the application process. If the application becomes unresponsive, you can use this to
     * terminate the process instantly. It is recommended to use the `exit()` method to close your
     * application properly.
     * @example
     * await Neutralino.app.killProcess();
     */
    killProcess(): Promise<void>;
    /**
     * Restarts the current application instance.
     * @param options
     * @example
     * await Neutralino.app.restartProcess();
     *
     * await Neutralino.app.restartProcess({ args: '--restarted' });
     */
    restartProcess(options?: RestartProcessOptions): Promise<void>;
    /**
     * Returns the current application configuration as a JSON object.
     * @returns The current application configuration. Sometimes, this
     * configuration object is not identical to your configuration file
     * because the framework updates the configuration during several
     * situations such as config overriding via CLI arguments and using
     * `0` as the port.
     * @example
     * let config = await Neutralino.app.getConfig();
     * console.log('URL = ', config.url);
     */
    getConfig(): Promise<any>;
    /**
     * Dispatches a new event to all app instances.
     * @param eventName Name of the event.
     * @param data Additional data for the event.
     * @example
     * await Neutralino.app.broadcast('myTestEvent', 'Hello');
     *
     * await Neutralino.app.broadcast('myTestEvent', {myData: 'Test data'});
     *
     * await Neutralino.app.broadcast('myTestEvent');
     */
    broadcast(eventName: string, data?: any): Promise<void>;
  };

  interface RestartProcessOptions {
    /** Additional command-line arguments that need to be passed to the new application instance's process. */
    args: string;
  }

  /** `Neutralino.clipboard` namespace offers functions to access system clipboard. */
  const clipboard: {
    /**
     * Writes text into the system clipboard.
     * @param text Text to store into the system clipboard.
     * @example
     * await Neutralino.clipboard.writeText('Test value');
     */
    writeText(text: string): Promise<void>;
    /**
     * Reads and returns text from system clipboard.
     * @returns Stored text from the system clipboard.
     * @example
     * let clipboardText = await Neutralino.clipboard.readText();
     * console.log(`Text: ${clipboardText}`);
     */
    readText(): Promise<string>;
  };

  /** Neutralino.computer namespace contains methods related to the user's hardware. */
  const computer: {
    /**
     * Returns system memory statistics in bytes.
     * @returns
     * @example
     * let memoryInfo = await Neutralino.computer.getMemoryInfo();
     * console.log(`RAM size: ${memoryInfo.physical.total}B`);
     */
    getMemoryInfo(): Promise<MemoryInfo>;
    /**
     * Returns the CPU architecture identifier: `x64` (x86 64bit/arm64), `ia32` (x86 32bit), `arm`, `itanium`, or `unknown`.
     * @returns CPU architecture.
     * @example
     * let arch = await Neutralino.computer.getArch();
     * console.log(arch);
     */
    getArch(): Promise<'x64' | 'ia32' | 'arm' | 'itanium' | 'unknown'>;
    /**
     * Returns operating system kernel information.
     * @returns
     * @example
     * let kernelInfo = await Neutralino.computer.getKernelInfo();
     * console.log(`Kernel: ${kernelInfo.variant}`);
     */
    getKernelInfo(): Promise<KernelInfo>;
    /**
     * Returns operating system information.
     * @returns
     * @example
     * let osInfo = await Neutralino.computer.getOSInfo();
     * console.log(`OS: ${kernelInfo.name}`);
     */
    getOSInfo(): Promise<OSInfo>;
    /**
     * Returns the CPU information.
     * @returns
     * @example
     * let cpuInfo = await Neutralino.computer.getCPUInfo();
     * console.log(`CPU model: ${cpuInfo.model}`);
     */
    getCPUInfo(): Promise<CPUInfo>;
    /**
     * Returns information about all connected displays.
     * @returns An array of `Display` objects.
     * @example
     * let displays = await Neutralino.computer.getDisplays();
     * for (let display of displays) {
     *     console.log(display);
     * }
     */
    getDisplays(): Promise<Display[]>;
    /**
     * Returns the current mouse cursor position.
     * @returns
     * @example
     * let pos = await Neutralino.computer.getMousePosition();
     * console.log(`Pos: ${pos.x}, ${pos.y}`);
     */
    getMousePosition(): Promise<MousePosition>;
  };

  interface MemoryInfo {
    /** Physical memory information. */
    physical: {
      /** Total physical memory. */
      total: number;
      /** Available physical memory. */
      available: number;
    };
    /** Virtual memory information. */
    virtual: {
      /** Total virtual memory. */
      total: number;
      /** Available virtual memory. */
      available: number;
    };
  }

  interface KernelInfo {
    /** Kernel type: `Linux`, `Darwin`, `Windows NT`, or `Unknown`. */
    variant: string;
    /** Version in the `<major>.<minor>.<patch>-<build_number>` format. */
    version: string;
  }

  interface OSInfo {
    /** Operating system name. */
    name: string;
    /** Operating system description. */
    description: string;
    /** Version in the `<major>.<minor>.<patch>-<build_number>` format. */
    version: string;
  }

  interface CPUInfo {
    /** Vendor name. */
    vendor: string;
    /** Model name. */
    model: string;
    /** The current CPU frequency in hertz (Hz). */
    frequency: number;
    /** CPU architecture name. Returns the same value as the `getArch` function. */
    architecture: string;
    /** Number of logical threads in the parallelism model. */
    logicalThreads: number;
    /** Number of physical cores in the CPU. */
    physicalCores: number;
    /** Number of physical CPU hardware units in the motherboard. */
    physicalUnits: number;
  }

  interface Display {
    /** A virtual display identifier. */
    id: number;
    /** Display resolution information. */
    resolution: {
      /** Display width. */
      width: number;
      /** Display height. */
      height: number;
    };
    /** DPI (Dots Per Inch) value. */
    dpi: number;
    /** BPP (Bits Per Pixel) value (also known as the color depth). */
    bpp: number;
    /** Refresh rate in hertz (Hz). */
    refreshRate: number;
  }

  interface MousePosition {
    /** Distance from the left edge of the screen in pixels. */
    x: number;
    /** Distance from the top edge of the screen in pixels. */
    y: number;
  }

  /** `Neutralino.debug` namespace contains application debugging utilities. */
  const debug: {
    /**
     *
     * @param message Content to be logged.
     * @param type Type of the message. Accepted values are `INFO`, `WARNING`,
     * and `ERROR`. The default value is `INFO`.
     * @example
     * await Neutralino.debug.log('Hello Neutralinojs');
     *
     * await Neutralino.debug.log('An error occured', 'ERROR');
     *
     * await Neutralino.debug.log('A warning message', 'WARNING');
     */
    log(message: string, type?: 'INFO' | 'WARNING' | 'ERROR'): Promise<void>;
  };

  /**
   * `Neutralino.events` namespace contains methods related to the native events handling.
   * These events are often initiated by the Neutralinojs server based on native state changes.
   */
  const events: {
    /**
     * Registers a new event handler.
     * @param eventName Name of the event.
     * @param handler A function that will be called when the given event occurs. Neutralinojs will
     * call the handler with a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
     * instance by attaching additional data to the `detail` key.
     * @example
     * function onTrayMenuItemClicked(event) {
     *   console.log(`Event data: ${event.detail}`);
     * }
     * await Neutralino.events.on('trayMenuItemClicked', onTrayMenuItemClicked);
     */
    on<T extends keyof EventTypes>(
      eventName: T,
      handler: (event: CustomEvent<EventTypes[T]>) => any
    ): Promise<void>;
    /**
     * Unregisters an event handler.
     * @param eventName Name of the event.
     * @param handler A function reference.
     * @example
     * await Neutralino.events.off('trayMenuItemClicked', onTrayMenuItemClicked);
     */
    off<T extends keyof EventTypes>(
      eventName: T,
      handler: (event: CustomEvent<EventTypes[T]>) => any
    ): Promise<void>;
    /**
     * Dispatches a new event to the current app instance. Neutralinojs
     * client uses this JavaScript function call internally to dispatch
     * native events.
     * @param eventName Name of the event.
     * @param data Additional data for the event.
     * @example
     * await Neutralino.events.dispatch('myTestEvent', {myData: 'Test data'});
     */
    dispatch(eventName: string, data?: any): Promise<void>;
    /**
     * Dispatches a new event to all clients (both app and extension clients).
     * @param eventName Name of the event.
     * @param data Additional data for the event.
     * @example
     * await Neutralino.events.broadcast('myTestEvent', 'Hello');
     *
     * await Neutralino.events.broadcast('myTestEvent', {myData: 'Test data'});
     *
     * await Neutralino.events.broadcast('myTestEvent'); // without any data payload
     */
    broadcast(eventName: string, data?: any): Promise<void>;
  };

  type EventTypes = {
    /** Occurs when the client library connects with the Neutralino server. */
    ready: null;
    /** Occurs when the user clicks on a tray menu item. */
    trayMenuItemClicked: TrayMenuItem;
    /** Occurs when the user closes the window. */
    windowClose: null;
    /** Occurs when the window gets focused. */
    windowFocus: null;
    /** Occurs when the window focus state is gone. */
    windowBlur: null;
    /** Occurs when the Neutralino server is offline. */
    serverOffline: null;
    /** Occurs when a new client access the application. */
    clientConnect: unknown;
    /** Occurs when a connected client leaves the application. */
    clientDisconnect: unknown;
    /** Occurs when a new application instance starts. */
    appClientConnect: unknown;
    /** Occurs when an application instance ends. */
    appClientDisconnect: unknown;
    /** Occurs when a new extension connects. */
    extClientConnect: unknown;
    /** Occurs when an extension disconnects. */
    extClientDisconnect: unknown;
    /** Occurs when an extension is ready to communicate with the app. */
    extensionReady: unknown;
    /** Occurs then there is an update in the spawned process. */
    spawnedProcess: SpawnedProcess;
  };

  /**
   * `Neutralino.extensions` namespace contains methods related to
   * Neutralino extensions. Extensions let developers write custom
   * backend APIs for Neutralinojs applications.
   *
   * Learn more about extensions with this [guide](https://neutralino.js.org/docs/how-to/extensions-overview).
   */
  const extensions: {
    /**
     * Dispatches a new event to an extension instance. If the targeted extension
     * is not connected yet, Neutralino client library will queue the function
     * call and send whenever the extension comes online.
     * @param extensionId Extension identifier.
     * @param eventName Name of the event.
     * @param data Additional data for the event.
     * @example
     * await Neutralino.extensions.dispatch('js.neutralino.sampleextension',
     *       'myTestEvent', {myData: 'Test data'});
     *
     * await Neutralino.extensions.dispatch('js.neutralino.sampleextension',
     *       'myTestEvent');
     */
    dispatch(extensionId: string, eventName: string, data?: any): Promise<void>;
    /**
     * Dispatches a new event to all connected extensions. If an extension is
     * loaded but not connected yet, the particular extension won't get the new
     * event. Use `extensions.dispatch` to send messages even if the extension
     * is not connected to the main process.
     * @param eventName Name of the event.
     * @param data Additional data for the event.
     * @example
     * await Neutralino.extensions.broadcast('myTestEvent', 'Hello');
     *
     * await Neutralino.extensions.broadcast('myTestEvent', {myData: 'Test data'});
     *
     * await Neutralino.extensions.broadcast('myTestEvent');
     */
    broadcast(eventName: string, data?: any): Promise<void>;
    /**
     * Returns details about connected and loaded extensions.
     * @returns
     * @example
     * let stats = await Neutralino.extensions.getStats();
     * console.log('stats: ', stats);
     */
    getStats(): Promise<ExtensionStats>;
  };

  interface ExtensionStats {
    /** An array of loaded extensions. */
    loaded: string[];
    /**
     * An array of connected extensions. These extensions have an active
     * WebSocket-based IPC connection with the main process.
     */
    connected: string[];
  }

  /** `Neutralino.filesystem` namespace contains methods for handling files. */
  const filesystem: {
    /**
     * Creates a new directory.
     * @param path New directory path.
     * @throws `NE_FS_DIRCRER` if directory creation is not possible.
     * @example
     * await Neutralino.filesystem.createDirectory('./newDirectory');
     *
     * await Neutralino.filesystem.createDirectory(NL_PATH + '/myFolder');
     */
    createDirectory(path: string): Promise<void>;
    /**
     * Removes a given directory.
     * @param path Directory path.
     * @throws `NE_FS_RMDIRER` if the removal is not possible.
     * @example
     * await Neutralino.filesystem.removeDirectory('./tmpDirectory');
     */
    removeDirectory(path: string): Promise<void>;
    /**
     * Writes a text file.
     * @param filename Filename.
     * @param data Content of the file.
     * @throws `NE_FS_FILWRER` for file write errors.
     * @example
     * await Neutralino.filesystem.writeFile('./myFile.txt', 'Sample content');
     */
    writeFile(filename: string, data: string): Promise<void>;
    /**
     * Appends text content to file. If the provided file doesn't
     * exist, this function creates a new file with data.
     * @param filename Filename.
     * @param data Content to append.
     * @throws `NE_FS_FILWRER` for file write errors.
     * @example
     * await Neutralino.filesystem.appendFile('./myFile.txt', 'Sample ');
     * await Neutralino.filesystem.appendFile('./myFile.txt', 'content');
     */
    appendFile(filename: string, data: string): Promise<void>;
    /**
     * Writes a binary file.
     * @param filename Filename.
     * @param data Content of the binary file as an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).
     * @throws `NE_FS_FILWRER` for file write errors.
     * @example
     * let rawBin = new ArrayBuffer(1);
     * let view = new Uint8Array(rawBin);
     * view[0] = 64; // Saves ASCII '@' to the binary file
     *
     * await Neutralino.filesystem.writeBinaryFile('./myFile.bin', rawBin);
     */
    writeBinaryFile(filename: string, data: ArrayBuffer): Promise<void>;
    /**
     * Appends binary data to a file. If the provided file doesn't exist, this function creates a new file with `data`.
     * @param filename Filename.
     * @param data Binary content to append as an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).
     * @throws `NE_FS_FILWRER` for file write errors.
     * @example
     * let rawBin = new ArrayBuffer(1);
     * let view = new Uint8Array(rawBin);
     * view[0] = 64; // Saves ASCII '@' to the binary file
     *
     * await Neutralino.filesystem.appendBinaryFile('./myFile.bin', rawBin);
     * await Neutralino.filesystem.appendBinaryFile('./myFile.bin', rawBin);
     */
    appendBinaryFile(filename: string, data: ArrayBuffer): Promise<void>;
    /**
     * Reads a text file.
     * @param filename Filename.
     * @param pos File cursor position in bytes.
     * @param size File reader buffer size in bytes.
     * @returns File content.
     * @throws `NE_FS_FILRDER` for file read errors.
     * @example
     * let data = await Neutralino.filesystem.readFile('./myFile.txt');
     * console.log(`Content: ${data}`);
     *
     * let data = await Neutralino.filesystem.readFile('./myFile.txt', {
     *   pos: 2,
     *   size: 10
     * });
     * console.log(`Content: ${data}`);
     */
    readFile(filename: string, pos?: number, size?: number): Promise<string>;
    /**
     * Reads binary files.
     * @param filename Filename.
     * @param pos File cursor position in bytes.
     * @param size File reader buffer size in bytes.
     * @returns Content of the binary file as an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).
     * @throws `NE_FS_FILRDER` for file read errors.
     * @example
     * let data = await Neutralino.filesystem.readBinaryFile({
     *   fileName: './myFile.bin'
     * });
     * let view = new Uint8Array(data);
     *
     * console.log('Binary content: ', view);
     */
    readBinaryFile(
      filename: string,
      pos?: number,
      size?: number
    ): Promise<ArrayBuffer>;
    /**
     * Removes given file.
     * @param filename Filename.
     * @throws `NE_FS_FILRMER` for file removal errors.
     */
    removeFile(filename: string): Promise<void>;
    /**
     * Reads directory contents.
     * @param path File/directory path.
     * @returns
     * @throws `NE_FS_NOPATHE` if the path doesn't exist.
     * @example
     * let entries = await Neutralino.filesystem.readDirectory(NL_PATH);
     * console.log('Content: ', entries);
     */
    readDirectory(path: string): Promise<ReadDirectoryResult>;
    /**
     * Copies a file to a new destination.
     * @param source Source path.
     * @param destination Destination path.
     * @throws `NE_FS_COPYFER` if the system cannot copy the file.
     * @example
     * await Neutralino.filesystem.copyFile('./source.txt', './destination.txt');
     */
    copyFile(source: string, destination: string): Promise<void>;
    /**
     * Moves a file to a new destination.
     * @param source Source path.
     * @param destination Destination path.
     * @throws `NE_FS_MOVEFER` if the system cannot move the file.
     * @example
     * await Neutralino.filesystem.moveFile('./source.txt', './destination.txt');
     */
    moveFile(source: string, destination: string): Promise<void>;
    /**
     * Returns file statistics for the given path. Therefore, you can use
     * this method to check for the existance of a file or directory.
     * @param path File or directory path.
     * @returns
     * @throws `NE_FS_NOPATHE` if the given path doesn't
     * exist or is inaccessible
     */
    getStats(path: string): Promise<FileStats>;
  };

  type ReadDirectoryResult = {
    /** Filename. */
    entry: string;
    /** The type of the entry (`FILE` or `DIRECTORY`). */
    type: 'FILE' | 'DIRECTORY';
  }[];

  interface FileStats {
    /** Size in bytes. */
    size: number;
    /** `true` if the path represents a normal file. */
    isFile: boolean;
    /** `true` if the path represents a directory. */
    isDirectory: boolean;
    /**
     * On Windows, returns Unix milliseconds of the file creation
     * time — On Unix or Unix-like platforms, returns Unix milliseconds
     * of the last [inode](https://en.wikipedia.org/wiki/Inode) modification time.
     */
    createdAt: number;
    /** Unix milliseconds of the last file modification time. */
    modifiedAt: number;
  }

  /**
   * `init` is not a namespace, it's a function that initializes a Neutralinojs application.
   *
   * he application developer needs to call this method explicitly via a JavaScript source
   * file before using any native API function. The init function does the following tasks
   * when it's called.
   *
   * - Starts a WebSocket connection with the Neutralinojs server asynchronously.
   * - Registers auto-reload event handler if the `--neu-dev-auto-reload` flag
   *   (the `neu run` command sets this flag) is provided.
   * - Defines `NL_CVERSION` with the client libary version in the `window` scope.
   *
   * You can call native API calls right after the init function call, as shown below.
   * @example
   * ```
   * Neutralino.init();
   * Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');
   * ```
   * Also, you can wrap immediate native calls with the ready event callback if you like.
   * ```
   * Neutralino.init();
   *
   * Neutralino.events.on('ready', () => {
   *   Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');
   * });
   * ```
   */
  function init(): void;

  /** `Neutralino.os` namespace contains methods related to the user's operating system. */
  const os: {
    /**
     * Executes a command and returns the output.
     * @param command The command that is to be executed.
     * @param options
     * @example
     * let info = await Neutralino.os.execCommand('python --version');
     * console.log(`Your Python version: ${info.stdOut}`);
     *
     * await Neutralino.os.execCommand('npm start', { background: true });
     */
    execCommand(
      command: string,
      options?: ExecCommandOptions
    ): Promise<ExecutedCommand>;
    /**
     * Spawns a process based on a command in background and let developers control it.
     * @param command The command that is to be executed in a new process.
     * @example
     * let pingProc = await Neutralino.os.spawnProcess('ping neutralino.js.org');
     *
     * Neutralino.events.on('spawnedProcess', (evt) => {
     *     if (pingProc.id == evt.detail.id) {
     *         switch (evt.detail.action) {
     *             case 'stdOut':
     *                 console.log(evt.detail.data);
     *                 break;
     *             case 'stdErr':
     *                 console.error(evt.detail.data);
     *                 break;
     *             case 'exit':
     *                 console.log(`Ping process terminated with exit code: ${evt.detail.data}`);
     *                 break;
     *         }
     *     }
     * });
     */
    spawnProcess(command: string): Promise<SpawnedProcess>;
    /**
     * Updates a spawned process based on a provided action and data.
     * @param id Neutralino-scoped process identifier.
     * @param action An action to take. Accepts only the following values:
     * - `stdIn`: Sends data to the process via the standard input stream.
     * - `stdInEnd`: Closes the standard input stream file descriptor.
     * - `exit`: Terminates the process.
     * @param data Additional data for the `action`. Send stardard input string if the `action` is `stdIn`.
     * @throws `NE_OS_UNLTOUP` if the process cannot be updated.
     * @example
     * let nodeProc = await Neutralino.os.spawnProcess('node');
     *
     * Neutralino.events.on('spawnedProcess', (evt) => {
     *     if (nodeProc.id == evt.detail.id) {
     *         switch (evt.detail.action) {
     *             case 'stdOut':
     *                 console.log(evt.detail.data); // 10
     *                 break;
     *             case 'stdErr':
     *                 console.error(evt.detail.data);
     *                 break;
     *             case 'exit':
     *                 console.log(`Node.js process terminated with exit code: ${evt.detail.data}`);
     *                 break;
     *         }
     *     }
     * });
     *
     * await Neutralino.os.updateSpawnedProcess(nodeProc.id, 'stdIn', 'console.log(5 + 5);');
     * await Neutralino.os.updateSpawnedProcess(nodeProc.id, 'stdInEnd');
     */
    updateSpawnedProcess(
      id: number,
      action: 'stdIn' | 'stdInEnd' | 'exit',
      data?: string
    ): Promise<void>;
    /**
     * Returns all spawned processes.
     * @returns An array of `SpawnedProcess` objects.
     * @example
     * await Neutralino.os.spawnProcess('ping neutralino.js.org');
     * await Neutralino.os.spawnProcess('ping codezri.org');
     *
     * let processes = await Neutralino.getSpawnedProcesses();
     * console.log(processes);
     */
    getSpawnedProcesses(): Promise<SpawnedProcess[]>;
    /**
     * Provides the value of a given environment variable.
     * @param key The name of the environment variable.
     * @returns Value of the given environment variable.
     * Returns an empty string if the environment variable
     * is not defined.
     * @example
     * let value = await Neutralino.os.getEnv('USER');
     * console.log(`USER = ${value}`);
     */
    getEnv(key: string): Promise<string>;
    /**
     * Returns all environment variables and their values.
     * @returns Environment variables details in key-value pairs.
     * @example
     * let envs = await Neutralino.os.getEnvs();
     * console.log(envs);
     */
    getEnvs(): Promise<{ [key: string]: string }>;
    /**
     * Shows the file open dialog.
     * @param title Title of the dialog.
     * @param options
     * @returns An array of selected entries.
     * @example
     * let entries = await Neutralino.os.showOpenDialog('Save your diagram', {
     *   defaultPath: '/home/my/directory/',
     *   filters: [
     *     {name: 'Images', extensions: ['jpg', 'png']},
     *     {name: 'All files', extensions: ['*']}
     *   ]
     * });
     * console.log('You have selected:', entries);
     */
    showOpenDialog(
      title?: string,
      options?: OpenDialogOptions
    ): Promise<string[]>;
    /**
     * Shows the file open dialog.
     * @param title Title of the dialog.
     * @param options
     * @returns Selected filename.
     * @example
     * let entry = await Neutralino.os.showSaveDialog('Open a file', {
     *   defaultPath: 'untitled.jpg',
     *   filters: [
     *     {name: 'Images', extensions: ['jpg', 'png']},
     *     {name: 'All files', extensions: ['*']}
     *   ]
     * });
     * console.log('You have selected:', entry);
     */
    showSaveDialog(
      title?: string,
      options?: SaveDialogOptions
    ): Promise<string>;
    /**
     * Shows the folder open dialog.
     * @param title Title of the dialog.
     * @param options
     * @returns Selected folder.
     * @example
     * let entry = await Neutralino.os.showFolderDialog('Select installation directory', {
     *   defaultPath: '/home/my/directory/'
     * });
     * console.log('You have selected:', entry);
     */
    showFolderDialog(
      title?: string,
      options?: FolderDialogOptions
    ): Promise<string>;
    /**
     * Displays a notification message.
     * @param title Notification title.
     * @param content Content of the notification.
     * @param icon Icon name. Accpeted values are: `INFO`, `WARNING`, `ERROR`,
     * and `QUESTION`. The default value is `INFO`
     * @example
     * await Neutralino.os.showNotification('Hello world', 'It works! Have a nice day');
     *
     * await Neutralino.os.showNotification('Oops :/', 'Something went wrong', 'ERROR');
     */
    showNotification(
      title: string,
      content: string,
      icon?: 'INFO' | 'WARNING' | 'ERROR' | 'QUESTION'
    );
    /**
     * Displays a message box.
     * @param title Title of the message box.
     * @param content Content of the message box.
     * @param choice Message box buttons. Accpeted values are: `OK`, `OK_CANCEL`, `YES_NO`,
     * `YES_NO_CANCEL`, `RETRY_CANCEL`, and `ABORT_RETRY_IGNORE`. The default value is `OK`.
     * @param icon Icon name. Accpeted values are: `INFO`, `WARNING`, `ERROR`, and `QUESTION`.
     * The default value is `INFO`.
     * @returns User's `choice`.
     * @example
     * await Neutralino.os.showMessageBox('Hello', 'Welcome');
     *
     * let button = await Neutralino.os
     *             .showMessageBox('Confirm',
     *                             'Are you sure you want to quit?',
     *                             'YES_NO', 'QUESTION');
     * if (button == 'YES') {
     *     Neutralino.app.exit();
     * }
     */
    showMessageBox(
      title: string,
      content: string,
      choice?:
        | 'OK'
        | 'OK_CANCEL'
        | 'YES_NO'
        | 'YES_NO_CANCEL'
        | 'RETRY_CANCEL'
        | 'ABORT_RETRY_IGNORE',
      icon?: 'INFO' | 'WARNING' | 'ERROR' | 'QUESTION'
    ): Promise<string>;
    /**
     * Creates/updates the tray icon and menu.
     * @param options
     * @example
     * let tray = {
     *   icon: '/resources/icons/trayIcon.png',
     *   menuItems: [
     *     {id: "about", text: "About"},
     *     {text: "-"},
     *     {id: "quit", text: "Quit"}
     *   ]
     * };
     *
     * await Neutralino.os.setTray(tray);
     */
    setTray(options: SetTrayOptions): Promise<void>;
    /**
     * Returns known platform-specific folders such as Downloads, Music, Videos, etc.
     * @param name Name of the folder. Accepted values are:
     * `config`, `data`, `cache`, `documents`, `pictures`, `music`, `video`, `downloads`,
     * `savedGames1`, and `savedGames2`.
     * @throws `NE_OS_INVKNPT` for invalid folder names.
     * @example
     * let downloadsPath = await Neutralino.os.getPath('downloads');
     * console.log(`Downloads folder: ${downloadsPath}`);
     */
    getPath(
      name:
        | 'config'
        | 'data'
        | 'cache'
        | 'documents'
        | 'pictures'
        | 'music'
        | 'video'
        | 'downloads'
        | 'savedGames1'
        | 'savedGames2'
    ): Promise<string>;
    /**
     * Opens a URL with the default web browser.
     * @param url URL to be opened.
     * @example
     * Neutralino.os.open('https://neutralino.js.org');
     */
    open(url: string): Promise<void>;
  };

  interface ExecCommandOptions {
    /**
     * Executes the command in background and resolve the Promise
     * immediately if this is set to `true`. This option makes
     * the process detached from the API function call, so if
     * you need to connect with the newly created process later,
     * consider using `os.spawnProcess`.
     */
    background: boolean;
    /** Standard input as a string. */
    stdIn: string;
  }

  interface ExecutedCommand {
    /** Process identifier. */
    pid: number;
    /** Standard output. */
    stdOut: string;
    /** Standard error. */
    stdErr: string;
    /** Exit code of the process. */
    exitCode: number;
  }

  interface SpawnedProcess {
    /** A Neutralino-scoped process identifier. */
    id: number;
    /** Process identifier from the operating system. */
    pid: number;
  }

  interface Filter {
    /** Filter name. */
    name: string;
    /** Array of file extensions. Eg: `['jpg', 'png']` */
    extensions: string[];
  }

  interface OpenDialogOptions {
    /** An array of Filter objects to filter the files list. */
    filter?: Filter[];
    /** Enables multi selections. */
    multiSelections?: boolean;
    /** Initial path/filename displayed by the dialog. */
    defaultPath?: string;
  }

  interface SaveDialogOptions {
    /** An array of Filter objects to filter the files list. */
    filter?: Filter[];
    /** Skips file overwrite warning message. */
    forceOverwrite?: boolean;
    /** Initial path/filename displayed by the dialog. */
    defaultPath?: string;
  }

  interface FolderDialogOptions {
    /** Initial path displayed by the dialog. */
    defaultPath?: string;
  }

  interface SetTrayOptions {
    /**
     * Tray icon path. Eg: `/resources/icons/trayIcon.png`. A `20x20`-sized
     * PNG image file works fine on all supported operating systems.
     */
    icon: string;
    /** An array of `TrayMenuItem` objects. */
    menuItems: TrayMenuItem[];
  }

  interface TrayMenuItem {
    /** A unique identifier for each menu item. */
    id?: string;
    /**
     * Label of the menu item. This field is a mandatory field.
     * Use `-` (hyphen) character for a menu separator.
     */
    text: string;
    /** A boolean flag to disable/enable a specific menu item. */
    isDisabled?: boolean;
    /** A boolean flag to mark a specific menu item as selected. */
    isChecked?: boolean;
  }

  /**
   * Neutralinojs has a built-in shared key-value storage.
   * It's like a global [`LocalStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
   * for all Neutralinojs modes. `Neutralinos.storage` exposes
   * methods for interacting with this storage feature.
   */
  const storage: {
    /**
     * Writes data into Neutralinojs shared storage.
     * @param key A unique identifier.
     * @param data Data as a string. If this value is `null` or `undefined`, the specific data record will be erased from the disk.
     * @example
     * await Neutralino.storage.setData('userDetails',
     *                         JSON.stringify({ username: 'TestValue'})
     * );
     */
    setData(key: string, data?: string | null): Promise<void>;
    /**
     * Reads and returns data for a given Neutralinojs shared storage key.
     * @param key Storage data record identifier.
     * @returns Data string of the storage record.
     * @example
     * let data = await Neutralino.storage.getData('userDetails');
     * console.log(`Data: ${data}`);
     */
    getData(key: string): Promise<string>;
    /**
     * Returns all storage keys.
     * @returns A string array of existing storage keys.
     * @example
     * let keys = await Neutralino.storage.getKeys();
     * console.log('Keys: ', keys);
     */
    getKeys(): Promise<string[]>;
  };

  /**
   * `Neutralino.updater` namespace contains methods related to built-in
   * automatic updater. Neutralinojs offers a built-in client-based
   * updating mechanism. Therefore, you can update Neutralinojs apps
   * without even calling third-party update services, operating system
   * level services, or other binaries/scripts.
   *
   * Learn more about the updater with this [guide](https://neutralino.js.org/docs/how-to/auto-updater).
   */
  const updater: {
    /**
     * Checks latest updates from the given URL. The URL
     * should return a valid Neutralinojs update manifest
     * with `Content-Type: application/json` header.
     * @param url URL to fetch update manifest.
     * @returns Update manifest.
     * @throws `NE_UP_CUPDMER` for invalid manifests and
     * `NE_UP_CUPDERR` for network connectivity issues.
     * @example
     * let url = 'https://example.com/updates/manifest.json';
     * let manifest = await Neutralino.updater.checkForUpdates(url);
     */
    checkForUpdates(url: string): Promise<any>;
    /**
     * Installs updates from the downloaded update manifest.
     * @throws `NE_UP_UPDNOUF` if the manifest isn't loaded.
     * If the update installation process fails, this
     * function will throw `NE_UP_UPDINER`.
     * @example
     * let url = 'https://example.com/updates/manifest.json';
     * let manifest = await Neutralino.updater.checkForUpdates(url);
     *
     * if (manifest.version !== NL_APPVERSION) {
     *     await Neutralino.updater.install();
     * } else {
     *     console.log('You are using the latest version!');
     * }
     */
    install(): Promise<void>;
  };

  /**
   * The `Neutralino.window` namespace contains methods related to
   * the current native window instance. This namespace's methods
   * will work only for the [`window`](https://neutralino.js.org/docs/configuration/modes#window) mode.
   */
  const window: {
    /**
     * Sets the title of the native window.
     * @param title Title of the window. Clears the title, if the function was called without the parameter.
     * @example
     * await Neutralino.window.setTitle('New title');
     */
    setTitle(title?: string): Promise<void>;
    /**
     * Returns the title of the native window.
     * @returns The current title of the native window instance.
     * @example
     * let title = await Neutralino.window.getTitle();
     * console.log(`title = ${title}`);
     */
    getTitle(): Promise<string>;
    /**
     * Minimizes the native window.
     * @example
     * await Neutralino.window.minimize();
     */
    minimize(): Promise<void>;
    /**
     * Maximizes the native window.
     * @example
     * await Neutralino.window.maximize();
     */
    maximize(): Promise<void>;
    /**
     * Restores the native window.
     * @example
     * await Neutralino.window.unmaximize();
     */
    unmaximize(): Promise<void>;
    /**
     * Returns `true` if the native window is maximized.
     * @returns `true` or `false` based on current maximized status.
     * @example
     * let status = await Neutralino.window.isMaximized();
     */
    isMaximized(): Promise<boolean>;
    /**
     * Enables the full screen mode.
     * @example
     * await Neutralino.window.setFullScreen();
     */
    setFullScreen(): Promise<void>;
    /**
     * Exits from the full screen mode.
     * @example
     * await Neutralino.window.exitFullScreen();
     */
    exitFullScreen(): Promise<void>;
    /**
     * Returns `true` if the native window is in the full screen mode.
     * @returns `true` or `false` based on current full screen status.
     * @example
     * let status = await Neutralino.window.isFullScreen();
     */
    isFullScreen(): Promise<boolean>;
    /**
     * Shows the native window.
     * @example
     * await Neutralino.window.show();
     */
    show(): Promise<void>;
    /**
     * Hides the native window.
     * @example
     * await Neutralino.window.hide();
     */
    hide(): Promise<void>;
    /**
     * Returns `true` if the native window is visible.
     * @returns `true` or `false` based on current visibility status.
     * @example
     * let status = await Neutralino.window.isVisible();
     */
    isVisible(): Promise<boolean>;
    /**
     * Focuses the native window.
     * @example
     * await Neutralino.window.focus();
     */
    focus(): Promise<void>;
    /**
     * Activates or deactivates the always on top mode.
     * @param onTop Says whether the on top mode should be activated or not.
     * The default value is `true`.
     * @example
     * await Neutralino.window.setAlwaysOnTop(true); // or setAlwaysOnTop();
     * await Neutralino.window.setAlwaysOnTop(false);
     */
    setAlwaysOnTop(onTop?: boolean): Promise<void>;
    /**
     * Moves the native window into given coordinates.
     * Neutralinojs's cross-platform coordinate system
     * starts from top-left corner of the screen.
     * In other words, `x=0,y=0` point refers to the
     * top-left corner of the device's main screen.
     * @param x An integer value for the horizontal position.
     * @param y An integer value for the vertical position.
     * @example
     * await Neutralino.window.move(200, 400);
     */
    move(x: number, y: number): Promise<void>;
    /**
     * Sets an icon for the native window or Dock.
     * @param icon Path of the icon. A `200x200` PNG image file
     * works fine on all supported operating systems.
     */
    setIcon(icon: string): Promise<void>;
    /**
     * Converts a given DOM element to a draggable region. The user
     * will be able to drag the native window by dragging the
     * given DOM element. This feature is suitable to make
     * custom window bars along with the [borderless mode](https://neutralino.js.org/docs/configuration/neutralino.config.json#modeswindowborderless-boolean).
     * @param domId A DOM element identifier.
     * @example
     * await Neutralino.window.setDraggableRegion('myCustomTitleBar');
     */
    setDraggableRegion(domId: string | HTMLElement): Promise<void>;
    /**
     * Converts a draggable region to a normal DOM elements by removing drag event handlers.
     * @param domId A DOM element identifier.
     * @example
     * await Neutralino.window.unsetDraggableRegion('myCustomTitleBar');
     */
    unsetDraggableRegion(domId: string | HTMLElement): Promise<void>;
    /**
     * This method sets the size of the window.
     * @param options This method always expects width and height couples. For example, if you are setting minWidth, you should set minHeight too.
     * @example
     * await Neutralino.window.setSize({
     *     width: 500,
     *     height: 200,
     *     maxWidth: 600,
     *     maxHeight: 400
     * });
     *
     * await Neutralino.window.setSize({
     *     resizable: false
     * });
     */
    setSize(options: WindowSizeParam): Promise<void>;
    /**
     * Returns window size information.
     * @returns
     * @example
     * let sizeInfo = await Neutralino.window.getSize();
     *
     * console.log(sizeInfo);
     */
    getSize(): Promise<WindowSize>;
    /**
     * Returns window position coordinates.
     * @returns
     * @example
     * let position = await Neutralino.window.getPosition();
     *
     * console.log(position);
     */
    getPosition(): Promise<WindowPosition>;
    /**
     * Creates a native window. You can use this method to create new window for your
     * multi-window Neutralinojs app. Neutralinojs spawns a new process for each native
     * window. Therefore, the new window works as an isolated app once the window is created.
     *
     * However, you can build communication streams between windows with the
     * [storage API](https://neutralino.js.org/docs/api/storage).
     * @param url URL to be loaded. Eg: `/resources/aboutWindow.html`.
     * Supports loading both local and remote app resources. Local
     * resource paths need to begin with `/`.
     * @param windowOptions an instance of WindowOptions type.
     * @returns
     * @example
     * await Neutralino.window.create('/resources/aboutWindow.html', {
     *     icon: '/resources/icons/aboutIcon.png',
     *     enableInspector: false,
     *     width: 500,
     *     height: 300,
     *     maximizable: false,
     *     exitProcessOnClose: true,
     *     processArgs: '--window-id=W_ABOUT'
     * });
     */
    create(url: string, windowOptions?: WindowOptions): Promise<CreatedWindow>;
  };

  interface WindowSizeParam {
    /** Window width in pixels. */
    width?: number;
    /** Window height in pixels. */
    height?: number;
    /** Minimum width of the window in pixels. */
    minWidth?: number;
    /** Minimum height of the window in pixels. */
    minHeight?: number;
    /** Maximum width of the window in pixels. */
    maxWidth?: number;
    /** Maximum height of the window in pixels. */
    maxHeight?: number;
    /** A boolean value to make the window resizable or fixed. */
    resizable?: boolean;
  }

  interface WindowSize {
    /** Window width in pixels. */
    width: number;
    /** Window height in pixels. */
    height: number;
    /** Minimum width of the window in pixels. */
    minWidth: number;
    /** Minimum height of the window in pixels. */
    minHeight: number;
    /** Maximum width of the window in pixels. */
    maxWidth: number;
    /** Maximum height of the window in pixels. */
    maxHeight: number;
    /** Says whether the window resizable or fixed. */
    resizable: boolean;
  }

  interface WindowPosition {
    /** Horizontal coordinate of the left edge of the window. */
    x: number;
    /** Vertical coordinate of the top edge of the window. */
    y: number;
  }

  interface WindowOptions {
    /** Window title. */
    title: string;
    /** Window icon path. */
    icon: string;
    /** Sets full screen mode. */
    fullScreen: boolean;
    /** Activates the top-most mode. */
    alwaysOnTop: boolean;
    /** Activates developer tools and opens the web inspector window. */
    enableInspector: boolean;
    /** Makes the window borderless. */
    borderless: boolean;
    /** Launches the window maximized. */
    maximize: boolean;
    /** Hides the window. */
    hidden: boolean;
    /** Makes the window maximizable or not. */
    maximizable: boolean;
    /** Exits the application process when the user clicks the window's close button. */
    exitProcessOnClose: boolean;
    /** Additional command-line arguments for the new window process. */
    processArgs: string;
  }

  interface CreatedWindow {
    /** Process identifier. */
    pid: number;
    /**
     * Standard output. This value is always empty since
     * the new window process starts asynchronously.
     */
    stdOut: string;
    /**
     * Standard error. This value is always empty since
     * the new window process starts asynchronously.
     */
    stdErr: string;
    /** Exit code of the process. */
    exitCode: number;
  }
}

/** Operating system name: `Linux`, `Windows`, or `Darwin` */
declare const NL_OS: 'Linux' | 'Windows' | 'Darwin';
/** Application identifier */
declare const NL_APPID: string;
/** Application version */
declare const NL_APPVERSION: string;
/** Application port */
declare const NL_PORT: number;
/** Mode of the application: `window`, `browser`, `cloud`, or `chrome` */
declare const NL_MODE: 'window' | 'browser' | 'cloud' | 'chrome';
/** Neutralinojs framework version */
declare const NL_VERSION: string;
/** Neutralinojs client version */
declare const NL_CVERSION: string;
/** Current working directory */
declare const NL_CWD: string;
/** Application path */
declare const NL_PATH: string;
/** Command-line arguments */
declare const NL_ARGS: string[];
/** Identifier of the current process */
declare const NL_PID: number;
/** Source of application resources: `bundle` or `directory` */
declare const NL_RESMODE: 'bundle' | 'directory';
/** Returns `true` if extensions are enabled */
declare const NL_EXTENABLED: boolean;
/** Framework binary's release commit hash */
declare const NL_COMMIT: string;
/** Client library's release commit hash */
declare const NL_CCOMMIT: string;
