from pathlib import Path


INPUT_FILE = "structure_clean.txt"
OUTPUT_FILE = "tree_output.md"

COMMON_ROOT = r"D:\0 Academic Project\8th sem\Code\Depression-Test"


def build_tree(paths):

    tree = {}

    for raw_path in paths:

        raw_path = raw_path.strip()

        if not raw_path:
            continue

        raw_path = raw_path.replace(COMMON_ROOT, "")

        raw_path = raw_path.lstrip("\\/")

        parts = Path(raw_path).parts

        current = tree

        for part in parts:
            current = current.setdefault(part, {})

    return tree


def print_tree(node, depth=0):

    lines = []

    items = list(node.items())

    for name, children in items:

        indent = "  " * depth

        lines.append(f"{indent}- {name}")

        lines.extend(
            print_tree(
                children,
                depth + 1
            )
        )

    return lines


def main():

    with open(
        INPUT_FILE,
        "r",
        encoding="utf-16"
    ) as file:

        paths = file.readlines()

    tree = build_tree(paths)

    output = print_tree(tree)

    with open(
        OUTPUT_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        file.write("\n".join(output))

    print(f"Tree written to: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()