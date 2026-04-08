from pathlib import Path
import os
import re
import sys

image_tag = os.environ["IMAGE_TAG"]

path = Path("overlays/dev/kustomization.yaml")
content = path.read_text()

pattern = r"(- name: todo-api\s+newName: docker\.io/romanindev/todo-api\s+newTag: )([^\s]+)"
updated, count = re.subn(pattern, r"\1" + image_tag, content, count=1)

if count != 1:
    print(f"Expected to update exactly 1 todo-api image tag, updated {count}", file=sys.stderr)
    sys.exit(1)

path.write_text(updated)
print(f"Updated todo-api image tag to {image_tag}")
