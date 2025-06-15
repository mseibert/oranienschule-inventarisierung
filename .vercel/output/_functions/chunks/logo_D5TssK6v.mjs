const logo = new Proxy({"src":"/_astro/logo.k-LAeJkM.png","width":400,"height":115,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martinseibert/Documents/code/inventar/src/assets/logo.png";
							}
							
							return target[name];
						}
					});

export { logo as default };
