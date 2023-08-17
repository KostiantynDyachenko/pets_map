import clsx from "clsx";
import { useCallback } from "react";
import HeartIcon  from "../assets/icons/HeartIcon";
import { Pet } from "./Map";

type Props = {
  data:any, onCreateFavorite?:(obg:any)=>void, onDeleteFavorite?:(obg:any)=>void, iconSize?:number, isWhite:boolean, className?:string
}

export default function FavoriteButton({ data, onCreateFavorite, onDeleteFavorite, iconSize = 15, isWhite, className }:Props) {

  const handleFavoriteClick = useCallback(() => {
    if (data.isFavorite) {
      onDeleteFavorite?.({ id: data._id })
    } else {
      onCreateFavorite?.({ id: data._id })
    }
  }, [data.isFavorite, data._id, onCreateFavorite, onDeleteFavorite])

  return  (
    <button
      className={clsx(
        "block border border-gray-600/70 rounded-full p-2",
        { 'border-gray-600/70': !isWhite, 'border-white/40 bg-white-50/10': isWhite },
        className,
      )}
      onClick={handleFavoriteClick}
    >
      <HeartIcon
        width={iconSize}
        height={iconSize}
        stroke={isWhite ? 'stroke-white' : 'stroke-black'}
        fill={clsx({
          'fill-transparent hover:fill-primary-500': !data.isFavorite,
          'fill-primary-500': data.isFavorite,
        })}
      />
    </button>
  )
}
