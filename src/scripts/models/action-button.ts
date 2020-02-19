import { MixedObject } from '../types'

export enum ActionButtonType {
  quickreply = 'quickreply',
}

export class ActionButton {
  private type: ActionButtonType
  private successor: string
  private l10n: {
    [key: string]: {
      title: string,
    },
  }

  constructor(options: MixedObject) {
    this.type = options.type
    this.successor = options.successor
    this.l10n = options.l10n
  }

  static fromJson(json: MixedObject): ActionButton {
    const normalizedData = ActionButtonNormalizer.normalize(json)

    return new ActionButton(normalizedData)
  }

  getTitle(locale: string): string {
    if (this.l10n[locale]) {
      return this.l10n[locale].title
    }

    return ''
  }

  getSuccessor(): string {
    return this.successor
  }
}

export class ActionButtonNormalizer {
  static normalize(data: MixedObject): MixedObject {
    const result: MixedObject = {
      type: data.type,
      successor: data.successor,
      l10n: {},
    }

    if (data.en) {
      result.l10n.en = data.en
    }

    if (data.de) {
      result.l10n.de = data.de
    }

    return result
  }
}