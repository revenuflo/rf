    var faviconURL = 'https://storage.googleapis.com/msgsndr/F7UgFDXmYhmt4WMeMjzs/media/67cfd7fb71713c4d858c2b81.svg'

    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconURL
    document.getElementsByTagName('head')[0].appendChild(link);
