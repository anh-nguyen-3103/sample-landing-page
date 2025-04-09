interface CardItemProps<T> {
  item: T
  index: number
}

export const CardItem = <T,>(props: CardItemProps<T>) => {
  return <div className="flex justify-center items-center px-4 py-2">123</div>
}
