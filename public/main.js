let n = 1 // 记录一下当前是第几页，默认是第一页
getPage.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('get', `/page${n+1}`)
    request.onreadystatechange = ()=>{
        if(request.readyState === 4 && request.status === 200){
            const array = JSON.parse(request.response) // 将 request.response 变成一个数组
            array.forEach(item=>{
                const li = document.createElement('li')
                li.textContent = item.id
                xxx.appendChild(li);
            })
            n += 1
        }
    }
    request.send()
}
getJSON.onclick = () => {
    const request = new XMLHttpRequest();
    request.open("get", "/5.json");
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log(typeof request.response);
        console.log(request.response);
        const bool = JSON.parse(request.response);
        myName.textContent = bool.name
        console.log(typeof bool);
        console.log(bool);
      }
    };
    request.send();
  };
getXML.onclick = ()=>{
    const request = new XMLHttpRequest()
    request.open('GET','/4.xml')
    request.onreadystatechange = ()=>{
        if(request.readyState === 4 && request.status >= 200 && request.status < 300){
            const dom = request.responseXML
            // responseXML 自动地把信息变成对象
            const text = dom.getElementsByTagName('warning')[0].textContent
            // 注意：getElementsByTagName 是获取一个伪数组，所以要加个下标才能找到我们想要的。
            // 获取到 warning 里面的 hello world
            console.log(text.trim()) // trim() 去除掉多余的空格
        }
    }
    request.send()
}
getHTML.onclick = ()=>{
    const request = new XMLHttpRequest()
    request.open('GET', '/3.html')
    request.onload = ()=>{
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)
    }
    request.onerror = ()=>{}
    request.send()
};
getJS.onclick = ()=>{
    const request = new XMLHttpRequest() // 创建请求http对象
    request.open('GET', '/2.js') // 调用 open 方法，有两个参数：方法 & url
    request.onload = ()=>{
        console.log(request.response)
        // 创建 script 标签
        const script = document.createElement('script')
        // 添加 script 内容
        script.innerHTML = request.response
        // 将 script 插入到 body 里
        document.body.appendChild(script)
    }
    // 添加 script 元素把 2.js 里面的字符串在浏览器中执行了
    request.onerror = ()=>{

    }
    request.send()
}

getCSS.onclick = ()=>{
    const request = new XMLHttpRequest()
    request.open('GET', 'style.css'); // readyState: 1
    request.onreadystatechange = ()=>{ 
        console.log(request.readyState)
        if(request.readyState === 4){
            console.log('下载完成')
            // 下载完成了，但不知道成功了没
            // 成功了，状态码一般是 2xx ；失败了，状态码一般是 4xx 或 5xx ；3xx 一般会再发一个新的请求
            if(request.status >= 200 && request.status < 300){
                // 创建 style 标签
                const style = document.createElement('style')
                // 填写 style 内容
                style.innerHTML = request.response
                // 只有在 request.readyState = 4 的时候，才能获取到 request.response，否则获取到的都是部分的 response ，没有太大意义。
                // 将上面两个，插到 head 里面
                document.head.appendChild(style)
            } else {
                // 如果是其他状态，那就认为是失败了
                alert('加载 CSS 失败')
                console.log(request.status)
            } 
        }
    }
    // 添加 style 元素把 style.css 里面的字符串在浏览器中执行了
    request.send(); // readyState: 2
}