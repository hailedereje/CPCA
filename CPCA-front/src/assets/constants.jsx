
export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    php: "8.2.3",
    "c++":"10.2.0",
    c:"10.2.0"
}

export const LANGUAGE_List = [
    "javascript",
    "typescript",
    "python",
    "java",
    "php",
    "cpp",
    "c",
    "csharp"
]
export const LANGUAGES = {
  javascript: {name:"javascript",version: "18.15.0"},
  typescript: {name:"typescript",version:"5.0.3"},
  python: {name:"python",version: "3.10.0"},
  java: {name:"java",version: "15.0.2"},
  php: {name: "php",version: "8.2.3"},
  "c++": {name: "cpp", version:"10.2.0"},
  c: {name: "c",version: "10.2.0"},
  csharp: {name: "csharp" ,version: ""}
}

export const SNIPTS = {
  
  "java": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, world!\");\n        System.out.println(\"This is Java programming.\");\n    }\n}"
  ,"c": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, world!\\n\");\n    printf(\"This is C programming.\");\n\n    return 0;\n}",
  "cpp": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, world!\" << std::endl;\n    std::cout << \"This is C++ programming.\" << std::endl;\n\n    return 0;\n}",
  "python": "print('Hello, world!')\nprint('This is Python programming.')\nprint('Python is awesome!')",
  "php": "<?php\n\necho 'Hello, world!';\necho 'This is PHP programming.';\n// PHP is a server-side scripting language.\n\n?>",
  "csharp": "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, world!\");\n        Console.WriteLine(\"This is C# programming.\");\n    }\n}",
  "javascript": "console.log('Hello, world!');\nconsole.log('This is JavaScript programming.');\n// JavaScript is widely used for web development.",
  "typescript": "console.log('Hello, world!');\nconsole.log('This is TypeScript programming.');\n// TypeScript is a superset of JavaScript."
}
  
  