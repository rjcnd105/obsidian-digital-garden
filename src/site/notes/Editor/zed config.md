---
{"dg-publish":true,"createdAt":"2024.10.07 월 오후 16:32","modifiedAt":"2025.01.10 금 오후 13:00","tags":["nix","sh"],"permalink":"/Editor/zed config/","dgPassFrontmatter":true}
---


https://github.com/rjcnd105/hj-dotfiles/tree/main/files/workspace/.config/zed
여기서 파일들을 볼 수 있습니다.

### file run

`cmd+shift+p` -> open task

tasks.json
```json
[
  {
    "label": "run file",
    "command": "sh ~/.config/zed/custom_runfile.sh",
    "description": "Compiles and runs the current code file",
    "use_new_terminal": false,
    "allow_concurrent_runs": false,
    "reveal": "always"
  },
]
```

그 다음 custom_runfile.sh 구성
```sh
touch ~/.config/zed/custom_runfile.sh
zed ~/.config/zed/custom_runfile.sh
```

custom_runfile.sh
```sh
#!/bin/bash

# Access the full path using ZED_FILE
full_path="$ZED_FILE"

# Extract filename with extensionㄴ

filename_ext=$(basename "$full_path")

# Extract filename and extension
filename="${filename_ext%.*}"
extension="${filename_ext##*.}"

if [ "$extension" == "sh" ]; then
    source "$full_path";
elif [ $filename != "flake.nix" -a "$extension" == "nix" ]; then
    nix eval -f "$full_path";
elif [ "$extension" == "py" ]; then
    python3 "$full_path";
else
    echo "run file: Not defined."
fi

```

키 맵으로 추가(cmd+r)
```json
[ 
	{
    "context": "Workspace",
    "bindings": {
      // "shift shift": "file_finder::Toggle"
      //

      "cmd-r": ["task::Spawn", { "task_name": "run file" }]
    }
  },
]
```

---

aditional
vscode에서 위 sh 사용

`cmd+shift+p` -> config user task
```json
{
	
	// See https://go.microsoft.com/fwlink/?LinkId=733558
	// for the documentation about the tasks.json format
	"version": "2.0.0",
	"tasks": [
		{
			"label": "Run Current File",
			"type": "shell",
			"command": "ZED_FILE=${file} ~/.config/zed/custom_runfile.sh",
			"group": {
				"kind": "build",
				"isDefault": true
			},
			"presentation": {
				"reveal": "always",
				"panel": "new"
			},
			"problemMatcher": []
		}
		
	]
}
```

### nix

lsp설정 추가랑 language_servers랑 둘 다 명시해줘야함.

install extention
https://github.com/zed-extensions/nix

settings.json
``` json
{
	"lsp": {
	    "nixd": {
		      "settings": {
		        
		      }
	    }
	 },
	 "languages": {
			"Nix": {
				"language_servers": [ "nixd", "!nil" ],
				"formatter": {
			        "external": {
			          "command": "nixfmt",
			          "arguments": []
			        }
			      }
			}
		}
	}
},
```
