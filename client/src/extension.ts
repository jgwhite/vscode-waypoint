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
          return [
            authItem(),
            buildArgsItem(),
            buildkitItem(),
            contextItem(),
            disableEntrypointItem(),
            dockerfileItem(),
            noCacheItem(),
            platformItem(),
            targetItem(),
          ];
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
  item.insertText = new vscode.SnippetString("auth = {\n\t$0\n}");
  return item;
}

function buildArgsItem() {
  const item = new vscode.CompletionItem(
    "build_args",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "Build args to pass to docker for the build step.\n\nAn array of strings of build-time variables passed as build-arg to docker for the build step.";
  item.insertText = new vscode.SnippetString("build_args = {\n\t$0\n}");
  return item;
}

function buildkitItem() {
  const item = new vscode.CompletionItem(
    "buildkit",
    vscode.CompletionItemKind.Property
  );
  item.documentation = "If set, use the buildkit builder from Docker.";
  item.insertText = "buildkit = true";
  return item;
}

function contextItem() {
  const item = new vscode.CompletionItem(
    "context",
    vscode.CompletionItemKind.Property
  );
  item.documentation = "Build context path.";
  item.insertText = 'context = "."';
  return item;
}

function disableEntrypointItem() {
  const item = new vscode.CompletionItem(
    "disable_entrypoint",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "If set, the entrypoint binary won't be injected into the image.\n\nThe entrypoint binary is what provides extended functionality such as logs and exec. If it is not injected at build time the expectation is that the image already contains it.";
  item.insertText = "disable_entrypoint = true";
  return item;
}

function dockerfileItem() {
  const item = new vscode.CompletionItem(
    "dockerfile",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "The path to the Dockerfile.\n\nSet this when the Dockerfile is not APP-PATH/Dockerfile.";
  item.insertText = new vscode.SnippetString('dockerfile = "$0"');
  return item;
}

function noCacheItem() {
  const item = new vscode.CompletionItem(
    "no_cache",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "Do not use cache when building the image.\n\nEnsures a clean image build.";
  item.insertText = "no_cache = false";
  return item;
}

function platformItem() {
  const item = new vscode.CompletionItem(
    "platform",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "Set target platform to build container if server is multi-platform capable.\n\nMust enable Docker buildkit to use the 'platform' flag.";
  item.insertText = new vscode.SnippetString('platform = "$0"');
  return item;
}

function targetItem() {
  const item = new vscode.CompletionItem(
    "target",
    vscode.CompletionItemKind.Property
  );
  item.documentation =
    "The target build stage in a multi-stage Dockerfile.\n\nIf buildkit is enabled unused stages will be skipped.";
  item.insertText = new vscode.SnippetString('target = "$0"');
  return item;
}
