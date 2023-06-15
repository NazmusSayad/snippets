export class SuperString extends String {
  constructor(...args) {
    super(args.flat().join('\n').trim())
  }

  getString() {
    return this.toString()
  }
}

export class Code extends SuperString {
  _getCode(ext) {
    if (!ext) throw new Errir('No extension provided')
    const code = this.toString()

    if (!code) return ''
    return `\`\`\`${ext}\n${code}\n\`\`\``
  }

  getString(ext) {
    return this._getCode(ext)
  }
}

export class Demo extends Code {
  getString(ext) {
    const embedCode = this._getCode(ext)
    if (!embedCode) return ''
    return `***DEMO:***\n\n${embedCode}`
  }
}
