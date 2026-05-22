# --------------------------------------------
# Step 1:
# Generate flat structure file
# --------------------------------------------


Get-ChildItem -Recurse -Force -ErrorAction SilentlyContinue |
Where-Object {
    $_.FullName -notmatch '\\node_modules\\|\\__pycache__\\|\\\.next\\|\\\.expo\\|\\\.pytest_cache\\|\\\.git\\|\\dist\\|\\build\\|\\coverage\\'
} |
ForEach-Object { $_.FullName } |
Out-File structure_clean.txt


# --------------------------------------------
# Step 2:
# Convert flat paths into tree structure
# --------------------------------------------

python .\convert_to_tree.py
python .\convert_to_tree_markdown.py

# --------------------------------------------
# Step 3:
# Done
# --------------------------------------------

Write-Host ""
Write-Host "Structure generation complete."
Write-Host "Generated files:"
Write-Host " - structure_clean.txt"
Write-Host " - tree_output.txt"
Write-Host " - tree_output.md"