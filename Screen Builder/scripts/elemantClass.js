export class Element {
    elementType;
    width;
    height;
    bgc;
    src;
    content;
    fColor;
    fSize;
    textAlign;
    textDecoration;
    fFamily;
    position;
    top;
    left;
    padding;
    margin;
    display;
    flexDirection;
    alignItems;
    justifyContent;
    borderSize;
    borderColor;
    borderRadius;
    borderStyle;
    constructor(elementType, width, height, bgc, src, content, fColor, fSize, textAlign, textDecoration, fFamily, position, top, left, padding, margin, display, flexDirection, alignItems, justifyContent, borderSize, borderColor, borderRadius, borderStyle) {
        this.elementType = elementType;
        this.width = width;
        this.height = height;
        this.bgc = bgc;
        this.src = src;
        this.content = content;
        this.fColor = fColor;
        this.fSize = fSize;
        this.textAlign = textAlign;
        this.textDecoration = textDecoration;
        this.fFamily = fFamily;
        this.position = position;
        this.top = top;
        this.left = left;
        this.padding = padding;
        this.margin = margin;
        this.display = display;
        this.flexDirection = flexDirection;
        this.alignItems = alignItems;
        this.justifyContent = justifyContent;
        this.borderSize = borderSize;
        this.borderColor = borderColor;
        this.borderRadius = borderRadius;
        this.borderStyle = borderStyle;
    }
}