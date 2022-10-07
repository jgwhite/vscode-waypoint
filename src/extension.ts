import * as vscode from "vscode";

export function activate() {
  vscode.languages.registerCompletionItemProvider(
    {
      scheme: "file",
      language: "hcl",
    },
    {
      provideCompletionItems: async (
        document: vscode.TextDocument,
        position: vscode.Position
      ) => {
        if (document.lineAt(position).text?.includes("buildkit =")) {
          return [
            new vscode.CompletionItem(
              "false",
              vscode.CompletionItemKind.Keyword
            ),
            new vscode.CompletionItem(
              "true",
              vscode.CompletionItemKind.Keyword
            ),
          ];
        } else {
          const result = [];

          if (!document.getText().includes("auth =")) {
            result.push(authItem());
          }
          if (!document.getText().includes("build_args =")) {
            result.push(buildArgsItem());
          }
          if (!document.getText().includes("buildkit =")) {
            result.push(buildkitItem());
          }
          if (!document.getText().includes("context =")) {
            result.push(contextItem());
          }
          if (!document.getText().includes("disable_entrypoint =")) {
            result.push(disableEntrypointItem());
          }
          if (!document.getText().includes("dockerfile =")) {
            result.push(dockerfileItem());
          }
          if (!document.getText().includes("no_cache =")) {
            result.push(noCacheItem());
          }
          if (!document.getText().includes("platform =")) {
            result.push(platformItem());
          }
          if (!document.getText().includes("target =")) {
            result.push(targetItem());
          }

          return result;
        }
      },
    }
  );
}

function authItem(): vscode.CompletionItem {
  const item = new vscode.CompletionItem(
    "auth",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "The authentication information to log into the docker repository.";
  item.insertText = new vscode.SnippetString("auth = {\n\t$1\n}");
  return item;
}

function buildArgsItem() {
  const item = new vscode.CompletionItem(
    "build_args",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "Build args to pass to docker for the build step.\n\nAn array of strings of build-time variables passed as build-arg to docker for the build step.";
  item.insertText = new vscode.SnippetString(
    'build_args = {\n\t"$1" = "$2"\n}'
  );
  return item;
}

function buildkitItem() {
  const item = new vscode.CompletionItem(
    "buildkit",
    vscode.CompletionItemKind.Property
  );
  item.documentation = "If set, use the buildkit builder from Docker.";
  item.insertText = new vscode.SnippetString("buildkit = ${1|true,false|}");
  return item;
}

function contextItem() {
  const item = new vscode.CompletionItem(
    "context",
    vscode.CompletionItemKind.Property
  );
  item.documentation = "Build context path.";
  item.insertText = new vscode.SnippetString('context = "$1"');
  return item;
}

function disableEntrypointItem() {
  const item = new vscode.CompletionItem(
    "disable_entrypoint",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "If set, the entrypoint binary won't be injected into the image.\n\nThe entrypoint binary is what provides extended functionality such as logs and exec. If it is not injected at build time the expectation is that the image already contains it.";
  item.insertText = new vscode.SnippetString(
    "disable_entrypoint = ${1|true,false|}"
  );
  return item;
}

function dockerfileItem() {
  const item = new vscode.CompletionItem(
    "dockerfile",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "The path to the Dockerfile.\n\nSet this when the Dockerfile is not APP-PATH/Dockerfile.";
  item.insertText = new vscode.SnippetString('dockerfile = "$1"');
  return item;
}

function noCacheItem() {
  const item = new vscode.CompletionItem(
    "no_cache",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "Do not use cache when building the image.\n\nEnsures a clean image build.";
  item.insertText = new vscode.SnippetString("no_cache = ${1|true,false|}");
  return item;
}

function platformItem() {
  const item = new vscode.CompletionItem(
    "platform",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "Set target platform to build container if server is multi-platform capable.\n\nMust enable Docker buildkit to use the 'platform' flag.";
  item.insertText = new vscode.SnippetString(
    'platform = "${1|linux/arm64,linux/amd64|}"'
  );
  return item;
}

function targetItem() {
  const item = new vscode.CompletionItem(
    "target",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "The target build stage in a multi-stage Dockerfile.\n\nIf buildkit is enabled unused stages will be skipped.";
  item.insertText = new vscode.SnippetString('target = "$1"');
  return item;
}
