import clsx from "clsx";
import { useCallback } from "react";
import { useMeQuery } from "../../api/users";
import { HeartIcon } from "./icons";

export default function FavoriteButton({ data, onCreateFavorite, onDeleteFavorite, iconSize = 15, isWhite, className }) {
  const { data: meData } = useMeQuery()

  const handleFavoriteClick = useCallback(() => {
    if (data.isFavorite) {
      onDeleteFavorite?.({ id: data._id })
    } else {
      onCreateFavorite?.({ id: data._id })
    }
  }, [data.isFavorite, data._id, onCreateFavorite, onDeleteFavorite])

  return meData && (
    <button
      className={clsx(
        "border border-gray-600/70 rounded-full p-2",
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
