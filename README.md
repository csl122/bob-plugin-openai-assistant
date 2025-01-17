OpenAI Polisher Bob Plugin
----------------------------

# 简介

在Bob中直接向ChatGPT进行一些快速提问! 不用再繁琐地打开浏览器了!! 一些简单的疑惑可以直接在Bob中便利解决!!!

支持的功能:
- 以任何语言向ChatGPT提问, ChatGPT可以用你设定的target语言回答.
- 历史记录: 拥有记忆功能的ChatGPT, 可以访问你之前的对话记录, 以便于ChatGPT更好地理解你的问题. 可以使用`#`命令来新建对话session, 即新建一个history file. 新建后, 新的对话目录path也将提供, 同目录下还将生成一个同名txt文件, 记录了解析后的对话历史记录.
- 自定义system prompt: 在插件设置页面有一个`Sys prompt`输入框, 你可以在输入框内自定义你需要的system prompt, 来让该插件实现你所需要的功能. 优秀的prompt可以在[awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts)以及[ChatGPT 中文调教指南](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)中获取.

> 项目Fork并修改自[yetone/bob-plugin-openai-polisher](https://github.com/yetone/bob-plugin-openai-polisher) 感谢!

> 历史记录参考自[bilibili-ayang/bob-plugin-free-chatgpt](https://github.com/bilibili-ayang/bob-plugin-free-chatgpt) 感谢!
<!-- # 使用截图

![](https://user-images.githubusercontent.com/1206493/222710761-bbd5ce10-2b12-42c0-abfa-5a3152157cb2.gif) -->

# 使用方法

> 注意: 历史记录存于`~/Library/Containers/com.hezongyidev.Bob/Data/Documents/InstalledPlugin/xyz.csl122.openai.assistant/openai_ass_history/`目录下.

1. 安装 [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85) (版本 >= 0.50)
2. 下载此插件: [openai-assistant.bobplugin](https://github.com/csl122/bob-plugin-openai-assistant/releases)
3. 双击安装此插件<!-- ![](https://user-images.githubusercontent.com/1206493/222712959-4a4b27e2-b129-408a-a8af-24a3a89df2dd.gif) -->
4. 去 [OpenAI](https://platform.openai.com/account/api-keys) 获取你的 API KEY
5. 把 API KEY 填入 Bob 此插件配置界面的 API KEY
 输入框中

![](https://user-images.githubusercontent.com/1206493/222712982-5c5598b0-8560-422f-837f-3ffd08a39f81.gif)

6. 安装 [PopClip](https://bobtranslate.com/guide/integration/popclip.html) 实现划词后鼠标附近出现小图标

![](https://user-images.githubusercontent.com/1206493/219933584-d0c2b6cf-8fa0-40a6-858f-8f4bf05f38ef.gif)

<!-- # 请作者喝一杯咖啡

<div align="center">
<img height="360" src="https://user-images.githubusercontent.com/1206493/220753437-90e4039c-d95f-4b6a-9a08-b3d6de13211f.png" />
<img height="360" src="https://user-images.githubusercontent.com/1206493/220756036-d9ac4512-0375-4a32-8c2e-8697021058a2.png" />
</div> -->
