var { historyFileName, readFile, writeFile, newFile, getFilePath } = require("./file");
var lang = require("./lang.js");

function supportLanguages() {
    return lang.supportLanguages.map(([standardLang]) => standardLang);
}


function translate(query, completion) {
    const filePath = getFilePath(historyFileName());
    // if query.text starts with "#", then create a history file and prompt the user
    if (query.text.startsWith("#")) {
        let fn = newFile();
        completion({
            result: {
                from: query.detectFrom,
                to: query.detectTo,
                toParagraphs: `New history file created in ~/Library/Containers/com.hezongyidev.Bob/Data/Documents/InstalledPlugin/xyz.csl122.openai.assistant/openai_ass_history/${fn}`.split("\n"),
            },
        });
        return;
    }



    const ChatGPTModels = [
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-0301",
        "gpt-4",
        "gpt-4-0314",
        "gpt-4-32k",
        "gpt-4-32k-0314"
    ]; // Model names that use the ChatGPT API, gpt-4 requires special access approval
    const api_keys = $option.api_keys.split(",").map((key) => key.trim());
    const api_key = api_keys[Math.floor(Math.random() * api_keys.length)];
    const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
    };
    const assistant_mode = $option.assistant_mode === "detailed";
    let prompt =
        "You are a helpful assistant who can answer questions in a natural way by giving the direct answer first.";
    if (assistant_mode) {
        prompt = `${prompt}. Then also provide additional information to help the user understand the answer.`;
    }
    else {
        prompt = `${prompt} Then only give very concise explanation within no more than three sentences.`;
    }

    // array of chatgpt msgs in the form of [{role: "user", content: "text"}]
    let msgs

    // prompt = `${prompt} Answer in ${lang.langMap.get(query.detectTo) || query.detectTo}.`;

    // http request body
    const body = {
        model: $option.model,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    };

    const isChatGPTModel = ChatGPTModels.indexOf($option.model) > -1;
    if (isChatGPTModel) {
        const filePath = getFilePath(historyFileName());
        // check the content of the file, whether it is "[]" or not
        // if it is "[]", then it is a new file, and we should add system prompt
        let exists = false;
        if ($file.exists(filePath)){
            content = $file.read(filePath).toUTF8();
            exists = content !== "[]";
        }

        // define the user's text with a language prompt to define the language of the response
        let user_text = `${query.text}\nAnswer in ${lang.langMap.get(query.detectTo) || query.detectTo}.` 
        if (exists) {
            msgs = readFile(historyFileName()).concat({ role: "user", content: user_text });
        }
        else {
            msgs = [
                { role: "system", content: prompt },
                { role: "user", content: user_text },
                ];
        }
        body.messages = msgs
    } else {
        body.prompt = `${prompt}:\n\n${query.text} =>`;
    }
    (async () => {
        const resp = await $http.request({
            method: "POST",
            url:
                $option.api_url +
                (isChatGPTModel ? "/v1/chat/completions" : "/v1/completions"),
            header,
            body,
        });

        if (resp.error) {
            const { statusCode } = resp.response;
            let reason;
            if (statusCode >= 400 && statusCode < 500) {
                reason = "param";
            } else {
                reason = "api";
            }
            completion({
                error: {
                    type: reason,
                    message: `接口响应错误 - ${resp.data.error.message}`,
                    addition: JSON.stringify(resp),
                },
            });
        } else {
            const { choices } = resp.data;
            if (!choices || choices.length === 0) {
                completion({
                    error: {
                        type: "api",
                        message: "接口未返回结果",
                    },
                });
                return;
            }
            if (isChatGPTModel) {
                targetTxt = choices[0].message.content.trim();
            } else {
                targetTxt = choices[0].text.trim();
            }

            // save localStorage
            msgs.push({ role: "assistant", content: choices[0].message.content});
            writeFile({ value: msgs, fileName: historyFileName() });

            completion({
                result: {
                    from: query.detectFrom,
                    to: query.detectTo,
                    toParagraphs: targetTxt.split("\n"),
                },
            });
            
        }
    })().catch((err) => {
        completion({
            error: {
                type: err._type || "unknown",
                message: err._message || "未知错误",
                addition: err._addition,
            },
        });
    });
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;
