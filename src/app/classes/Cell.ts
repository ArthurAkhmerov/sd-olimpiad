
const defaultCellColor:string = '#ffffff';
    
export class Cell {
    private color: string;

    constructor(private value: boolean = false){
        this.color = defaultCellColor;
    }

    public get Value() :boolean {
        return this.value;
    }

    public get Color() :string {
        return this.color;
    }

    public switch(): void {
        this.value = !this.value;
    }

    public includeToDomain(color: string) {
        this.color = color;
    }

    public excludeFromDomain() {
        this.color = defaultCellColor;
    }
  }