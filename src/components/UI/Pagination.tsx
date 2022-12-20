import { useEffect, useState } from 'react';

export default function Pagination(props: PaginationProps) {
  const [linkModels, setLinkModels] = useState<linkModel[]>([]);

  function selectPage(link: linkModel) {
    if (link.page === props.currentPage) {
      return;
    }
    if (!link.enabled) {
      return;
    }
    props.onChange(link.page);
  }
  useEffect(() => {
    const prevPageEnabled = props.currentPage !== 1;
    const prevPage = props.currentPage - 1;
    const links: linkModel[] = [];
    links.push({ text: 'Previos', enabled: prevPageEnabled, page: prevPage, active: false });
    for (let i = 1; i <= props.totalAmountOfPages; i++) {
      if (i >= props.currentPage - props.radio && i <= props.currentPage + props.radio) {
        links.push({
          text: `${i}`,
          active: props.currentPage === i,
          enabled: true,
          page: i
        });
      }
    }
    const nextPageEnabled =
      props.currentPage !== props.totalAmountOfPages && props.totalAmountOfPages > 0;
    const nextPage = props.currentPage + 1;
    links.push({ text: 'Next', page: nextPage, enabled: nextPageEnabled, active: false });
    setLinkModels(links);
  }, [props.currentPage, props.totalAmountOfPages, props.radio]);

  return (
    <nav>
      <ul className="m-0 pagination justify-content-center">
        {linkModels.map((link) => (
          <li
            key={link.text}
            style={link.enabled ? { cursor: 'pointer' } : { cursor: 'auto' }}
            onClick={() => selectPage(link)}
            className={`page-item cursor ${link.active ? 'active' : ''} ${
              link.enabled ? '' : 'disabled'
            }`}>
            <span className="page-link">{link.text}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface linkModel {
  page: number;
  enabled: boolean;
  text: string;
  active: boolean;
}

interface PaginationProps {
  currentPage: number;
  totalAmountOfPages: number;
  radio: number;
  onChange(page: number): void;
}

Pagination.defaultProps = {
  radio: 5
  
};
